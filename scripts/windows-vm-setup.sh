#!/usr/bin/env bash
set -euo pipefail

# Creates a Windows VM on the current Linux host while preserving SSH/Docker setup.
# Usage:
#   sudo bash scripts/windows-vm-setup.sh /path/to/windows.iso [/path/to/virtio-win.iso]

WIN_ISO_PATH="${1:-}"
VIRTIO_ISO_PATH="${2:-/var/lib/libvirt/boot/virtio-win.iso}"

VM_NAME="${VM_NAME:-win11-eval}"
VM_RAM_MB="${VM_RAM_MB:-24576}"     # 24 GiB
VM_VCPUS="${VM_VCPUS:-6}"
VM_DISK_PATH="${VM_DISK_PATH:-/var/lib/libvirt/images/win11-eval.qcow2}"
VM_DISK_SIZE="${VM_DISK_SIZE:-220G}"
VM_NETWORK="${VM_NETWORK:-default}" # libvirt NAT; keeps host SSH/public IP untouched

if [[ -z "${WIN_ISO_PATH}" ]]; then
  echo "Missing Windows ISO path."
  echo "Example: sudo bash scripts/windows-vm-setup.sh /var/lib/libvirt/boot/Win11_Enterprise_Eval.iso /var/lib/libvirt/boot/virtio-win.iso"
  exit 1
fi

if [[ ! -f "${WIN_ISO_PATH}" ]]; then
  echo "Windows ISO not found: ${WIN_ISO_PATH}"
  exit 1
fi

if ! command -v virt-install >/dev/null 2>&1; then
  echo "virt-install not found. Install virtualization packages first."
  exit 1
fi

if ! virsh -c qemu:///system net-info "${VM_NETWORK}" >/dev/null 2>&1; then
  echo "libvirt network '${VM_NETWORK}' not found. Available networks:"
  virsh -c qemu:///system net-list --all || true
  exit 1
fi

if ! virsh -c qemu:///system list --all | awk '{print $2}' | grep -qx "${VM_NAME}"; then
  if [[ ! -f "${VM_DISK_PATH}" ]]; then
    qemu-img create -f qcow2 "${VM_DISK_PATH}" "${VM_DISK_SIZE}"
  fi

  DISK_ARGS=(
    --disk "path=${VM_DISK_PATH},format=qcow2,bus=virtio"
  )

  if [[ -f "${VIRTIO_ISO_PATH}" ]]; then
    DISK_ARGS+=(--disk "path=${VIRTIO_ISO_PATH},device=cdrom")
  else
    echo "virtio driver ISO not found at ${VIRTIO_ISO_PATH}."
    echo "Windows install can still start, but you may not see the virtual disk until virtio drivers are loaded."
  fi

  virt-install \
    --connect qemu:///system \
    --name "${VM_NAME}" \
    --memory "${VM_RAM_MB}" \
    --vcpus "${VM_VCPUS}" \
    --cpu host-passthrough \
    --machine q35 \
    --os-variant win10 \
    --boot "uefi,loader.secure=yes,loader=/usr/share/OVMF/OVMF_CODE_4M.ms.fd,nvram.template=/usr/share/OVMF/OVMF_VARS_4M.ms.fd" \
    --tpm "backend.type=emulator,backend.version=2.0,model=tpm-tis" \
    "${DISK_ARGS[@]}" \
    --cdrom "${WIN_ISO_PATH}" \
    --network "network=${VM_NETWORK},model=virtio" \
    --graphics vnc,listen=127.0.0.1 \
    --video qxl \
    --noautoconsole
else
  echo "VM '${VM_NAME}' already exists. Skipping creation."
fi

virsh -c qemu:///system start "${VM_NAME}" >/dev/null 2>&1 || true

echo
echo "VM '${VM_NAME}' is defined."
echo "Status:"
virsh -c qemu:///system dominfo "${VM_NAME}" | sed -n '1,15p'
echo
echo "VNC display:"
virsh -c qemu:///system vncdisplay "${VM_NAME}"
echo
echo "SSH tunnel from your local machine:"
echo "  ssh -L 5900:127.0.0.1:5900 root@<your-server-ip>"
echo "Then open a VNC client to 127.0.0.1:5900."
