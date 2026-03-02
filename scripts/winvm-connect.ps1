param(
  [string]$ServerIp = "95.217.76.248",
  [string]$VmIp = "192.168.122.114",
  [int]$LocalPort = 13389
)

Write-Host "Starting SSH tunnel to Windows VM..."
Write-Host "RDP target: 127.0.0.1:$LocalPort"
Write-Host "Press Ctrl+C to close tunnel."

ssh -N -L "${LocalPort}:${VmIp}:3389" "root@${ServerIp}"
