# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  config.vm.define "winfrey-ip-3"

  config.vm.box = "geerlingguy/ubuntu2004"
  config.vm.hostname = "winfrey-ip-3"

  config.vm.network "private_network", ip: "192.168.56.50"

  config.vm.synced_folder ".", "/vagrant"
  config.vm.synced_folder ".", "/home/vagrant/winfrey-ip-3"

  config.vm.network "forwarded_port", guest: 3000, host: 3000
  config.vm.network "forwarded_port", guest: 5000, host: 5000
  config.vm.network "forwarded_port", guest: 27017, host: 27017

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "2048"
    vb.cpus = 2
  end

  config.vm.provision "shell", inline: <<-SHELL
    sudo apt-get update
    sudo apt-get install -y python3 python3-pip ansible apt-transport-https ca-certificates curl gnupg-agent software-properties-common

    # Add Docker’s official GPG key
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

    # Add Docker apt repository
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
    sudo apt-get update

    # Install Docker Engine
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io

    # Start and enable Docker
    sudo systemctl enable docker
    sudo systemctl start docker

    # Add vagrant user to docker group
    sudo usermod -aG docker vagrant

    # Install Docker SDK for Python (required by Ansible docker_container)
    pip3 install docker
  SHELL

  config.vm.provision "ansible_local" do |ansible|
    ansible.playbook = "playbook.yml"
  end

end

