param ($IP, $DNSNAME, $ResourceGroupName, $ZONENAME)

$PUBLIC_IP_ID = az network public-ip list --query "[?ipAddress=='$IP'].id" -o tsv

az network dns record-set a add-record --resource-group $ResourceGroupName --record-set-name '@' --zone-name $ZONENAME --ipv4-address 1.1.1.1

az network dns record-set a update --name '@' --resource-group $ResourceGroupName --zone-name $ZONENAME --target-resource $PUBLIC_IP_ID

az network public-ip update --ids $PUBLIC_IP_ID --dns-name $DNSNAME

# return the fqdn (fully qualified domain name) assigned to the IPv4 address
az network public-ip list --query "[?ipAddress!=null]|[?contains(ipAddress, '$IP')].[dnsSettings.fqdn]" -o table