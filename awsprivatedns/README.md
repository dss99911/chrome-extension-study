# AWS Private DNS Redirector
when we access private dns by VPN.
VPN only whitelisted ip address.
but, can't whitelisted dns name in some VPN solution.

so, when we access the private dns like the below.
```
http://ip-10-50-4-186.ap-south-1.compute.internal:8890/
```
this extension automatically redirect to `http://10.50.4.186:8890/`
	

## How to install
1. download this folder
2. go to `chrome://extensions/`
3. turn on developer mode
4. load unzipped program