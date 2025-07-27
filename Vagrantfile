# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrant configuration for provisioning a simple Ubuntu 20.04 VM
Vagrant.configure("2") do |config|

  # Define the VM name in VirtualBox
  config.vm.define "winfrey-ip-3"

  # Use a prebuilt Ubuntu 20.04 box maintained by Jeff Geerling
  config.vm.box = "geerlingguy/ubuntu2004"

  # Set the hostname of the virtual machine
  config.vm.hostname = "winfrey-ip-3"

  # Share current folder to VM (optional)
  config.vm.synced_folder ".", "/home/vagrant/winfrey-ip-3"

  # Forward important ports from guest to host
  # Port 3000 for frontend (e.g., React or similar)
  # Port 5000 for backend API (e.g., Flask)
  # Port 27017 for MongoDB
  config.vm.network "forwarded_port", guest: 3000, host: 3000
  config.vm.network "forwarded_port", guest: 5000, host: 5000
  config.vm.network "forwarded_port", guest: 27017, host: 27017

  # Configure VM resources: 2GB memory and 2 CPUs
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "2048"
    vb.cpus = 2
  end

  # Provisioning step to install Python 3 and pip
  # These are required for running Ansible or Python-based scripts inside the VM
  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y python3 python3-pip
  SHELL
end
 