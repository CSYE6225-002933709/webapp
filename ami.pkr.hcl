packer {
    required_plugins {
    amazon = {
      source  = "github.com/hashicorp/amazon"
      version = ">= 1.0.0"
    }
  }
}

variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "source_ami" {
  type    = string
  default = "ami-06db4d78cb1d3bbf9" # Debian 12
}

variable "ssh_username" {
  type    = string
  default = "admin"
}

variable "subnet_id" {
  type    = string
  default = "subnet-04e4da3f990d0df5e"
}

variable "demo_account" {
  type = string
  default = "987654320394"
}

# https://www.packer.io/plugins/builders/amazon/ebs
source "amazon-ebs" "my-ami" {

  region     = "${var.aws_region}"
  ami_name        = "csye6225_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  ami_description = "AMI for CSYE 6225"
  ami_users = [ "${var.demo_account}" ]
  ami_regions = [
    "us-east-1",
  ]

  aws_polling {
    delay_seconds = 120
    max_attempts  = 50
  }

  instance_type = "t2.micro"
  source_ami    = "${var.source_ami}"
  ssh_username  = "${var.ssh_username}"
  subnet_id     = "${var.subnet_id}"  

  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = "/dev/xvda"
    volume_size           = 8
    volume_type           = "gp2"
  }

  
}

build {

  sources = ["source.amazon-ebs.my-ami"]  

  provisioner "file" {

    source = "project.zip"
    destination = "/home/admin/project.zip"
  }

  provisioner "file" {
    source = "webapp.service"
    destination  = "/home/admin/webapp.service"
  }

  provisioner "file" {
    source = "cloudwatch-config.json"
    destination = "/home/admin/cloudwatch-config.json"
  }

  provisioner "shell" {
    environment_vars = [
      "DEBIAN_FRONTEND=noninteractive",
      "CHECKPOINT_DISABLE=1"
    ]
    scripts = [
      "instance_setup.sh"
    ]
  }
  post-processor "manifest" {
        output = "manifest.json"
        strip_path = true
    }
}
