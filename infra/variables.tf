variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "eu-central-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "instance_key_name" {
  description = "Name of an existing AWS EC2 Key Pair"
  type        = string
}

variable "my_ip_cidr" {
  description = "Your public IP in CIDR format (example: 1.2.3.4/32)"
  type        = string
}
