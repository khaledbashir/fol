#!/usr/bin/env bash
set -euo pipefail

VM_NAME="${1:-win11-eval}"

if ! command -v virsh >/dev/null 2>&1; then
  echo "virsh not found"
  exit 1
fi

state="$(virsh domstate "$VM_NAME" 2>/dev/null || true)"
if [[ "$state" != "running" ]]; then
  virsh start "$VM_NAME" >/dev/null
fi

echo "VM: $VM_NAME"
virsh dominfo "$VM_NAME" | awk -F: '/State|Autostart/ {gsub(/^ +/, "", $2); print $1": "$2}'
echo
echo "Laptop tunnel command:"
echo "ssh -N -L 13389:192.168.122.114:3389 root@95.217.76.248"
