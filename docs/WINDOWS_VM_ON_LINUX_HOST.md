# Windows VM On Existing Linux Host (Hetzner Robot)

This runbook documents exactly how to keep the current Linux server (SSH + Docker) and run a Windows VM alongside it.

## Goal

- Keep Linux host as-is (same SSH workflow).
- Add Windows 11 evaluation VM using KVM/libvirt.
- Allocate fixed VM resources (CPU/RAM/disk).

## Host Specs Used

- CPU: Intel i7-8700 (`6 cores / 12 threads`, VT-x available)
- RAM: `125.7 GiB`
- Disk: `2 x 953.9GB NVMe` in RAID1 (about `933GB` usable)

## What Was Installed

```bash
apt-get update
DEBIAN_FRONTEND=noninteractive apt-get install -y \
  qemu-system-x86 qemu-utils \
  libvirt-daemon-system libvirt-clients \
  virtinst ovmf bridge-utils
```

Validation:

```bash
systemctl is-active libvirtd
systemctl is-enabled libvirtd
virsh -c qemu:///system net-list --all
```

Expected network includes:

- `default` -> `active` (NAT network)

## VM Assets Created

- Windows VM disk (thin qcow2):
  - `/var/lib/libvirt/images/win11-eval.qcow2` (`220G`)
- Setup script:
  - `/fol/scripts/windows-vm-setup.sh`

## ISO Downloads (directly on server)

### Windows 11 Enterprise Eval ISO

```bash
cd /var/lib/libvirt/boot
curl -L --retry 5 -o Win11Eval.iso "https://go.microsoft.com/fwlink/?linkid=2334167&clcid=0x409&culture=en-us&country=us"
ls -lh /var/lib/libvirt/boot/Win11Eval.iso
```

### VirtIO Drivers ISO

```bash
cd /var/lib/libvirt/boot
curl -L --retry 5 -o virtio-win.iso "https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/latest-virtio/virtio-win.iso"
ls -lh /var/lib/libvirt/boot/virtio-win.iso
```

## VM Creation

```bash
sudo bash /fol/scripts/windows-vm-setup.sh /var/lib/libvirt/boot/Win11Eval.iso
```

Default sizing in script:

- RAM: `24576 MB` (24GB)
- vCPU: `6`
- Disk: `220G`
- Network: libvirt `default` NAT

## Attach VirtIO ISO (after VM exists)

`sata` CD hotplug failed while VM was running, so attach while VM is off:

```bash
virsh destroy win11-eval
virsh attach-disk win11-eval /var/lib/libvirt/boot/virtio-win.iso sdb \
  --type cdrom --mode readonly --targetbus sata --config
virsh domblklist win11-eval
```

Expected:

- `sda` -> `/var/lib/libvirt/boot/Win11Eval.iso`
- `sdb` -> `/var/lib/libvirt/boot/virtio-win.iso`

Start VM:

```bash
virsh start win11-eval
virsh vncdisplay win11-eval
```

## Connect To Installer

From local machine:

```bash
ssh -L 5900:127.0.0.1:5900 root@<SERVER_IP>
```

Then open VNC client to:

- `127.0.0.1:5900`

## Windows Setup Steps (important)

At "Select location to install Windows 11" with no disks:

1. Click `Load Driver`
2. Open virtio CD drive (`virtio-win`)
3. Browse to:
   - `E:\viostor\w11\amd64`
4. Select `Red Hat VirtIO SCSI controller`
5. Click `Next`
6. Disk appears (`Disk 0 Unallocated Space`, `220GB`)
7. Select disk and click `Next`

## Boot Menu Loop Fix

If UEFI keeps returning to Boot Manager:

```bash
virsh destroy win11-eval
virt-xml win11-eval --edit --boot cdrom,hd,menu=on
virsh start win11-eval
```

In Boot Manager, pick the DVD entry for Windows ISO (not virtio ISO).

## Useful Commands

VM state:

```bash
virsh list --all
virsh domstate win11-eval
```

Block devices:

```bash
virsh domblklist win11-eval
```

Shutdown / force stop:

```bash
virsh shutdown win11-eval
virsh destroy win11-eval
```

Start:

```bash
virsh start win11-eval
```

## Notes

- `*** System restart required ***` after package install is normal and did not block VM setup.
- Linux host SSH/Docker workflow remains unchanged.
- Windows evaluation is temporary; convert to licensed install later if needed.

## Daily Use (No VNC)

Use this quick flow every day.

1. Start VM if needed:

```bash
bash /fol/scripts/winvm-up.sh
```

2. From laptop, open SSH tunnel and keep window open:

```powershell
powershell -ExecutionPolicy Bypass -File .\winvm-connect.ps1
```

3. Open RDP client (1Remote or mstsc):

- Host: `127.0.0.1`
- Port: `13389`
- User: `.\Bash`
- Password: your Windows VM password

4. When done:

- Close RDP.
- Stop tunnel by closing that PowerShell window (`Ctrl+C` if needed).

## One-Time Convenience

Enable VM auto-start on host boot:

```bash
virsh autostart win11-eval
```

## Fast Troubleshooting

If RDP fails, check these in order.

1. VM running:

```bash
virsh domstate win11-eval
```

2. Tunnel alive from laptop:

```powershell
Test-NetConnection 127.0.0.1 -Port 13389
```

3. If tunnel test fails, restart tunnel command.

## Ultra Simple Mode

If you only want two commands to remember:

Server:

```bash
bash /fol/scripts/winvm-up.sh
```

Laptop:

```powershell
powershell -ExecutionPolicy Bypass -File .\winvm-connect.ps1
```
