param ($ClusterName, $ResourceGroupName, $ContainerRegistryName)
az aks update -n $ClusterName -g $ResourceGroupName --attach-acr $ContainerRegistryName