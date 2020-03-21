---
layout: post
title: "One-for-all Zabbix-agent Installation script"
date: 2019-03-12 00:00:00 -0000
categories: Linux, Ops
---

Short answer is, host all file on your own server, and add the following script to your XShell, it will work at least for CentOS 5-7 with only one-click.

If you are managing a large amount of Linux servers with different distribution and a wide range of version, Zabbix agent installation can be an annoying job. There are different repo file and GPG KEY file for EL5, EL6 or EL7. And there is firewalld instead of iptables on EL7.

To get the job done with only one script, all GPG KEY file shall be provided. And then modify the repo file, using system variable form the correct URL and key.

```bash
head -1 /etc/issue ; cat /etc/centos-release

cd /etc/yum.repos.d/
mv zabbix.repo zabbix.repo.`date "+%Y%m%d-%s"`.bak
wget -O zabbix.repo http://acsediment.github.io/repo/zabbix.repo
cd /etc/pki/rpm-gpg/
wget -O RPM-GPG-KEY-ZABBIX http://acsediment.github.io/repo/RPM-GPG-KEY-ZABBIX
wget -O RPM-GPG-KEY-ZABBIX-A14FE591-EL5 http://acsediment.github.io/repo/RPM-GPG-KEY-ZABBIX-A14FE591-EL5
wget -O RPM-GPG-KEY-ZABBIX-A14FE591-EL6 http://acsediment.github.io/repo/RPM-GPG-KEY-ZABBIX-A14FE591-EL6
wget -O RPM-GPG-KEY-ZABBIX-A14FE591-EL7 http://acsediment.github.io/repo/RPM-GPG-KEY-ZABBIX-A14FE591-EL7
yum makecache
yum install -y zabbix-agent
cd /etc/zabbix/
mv zabbix_agentd.conf zabbix_agentd.conf.`date "+%Y%m%d-%s"`.bak
wget -O zabbix_agentd.conf http://acsediment.github.io/conf/zabbix_agentd.conf


service iptables status
systemctl status firewalld
#Check firewall status for review.

iptables -I INPUT -p tcp --dport 10050 -j ACCEPT
service iptables save
service iptables restart
firewall-cmd --permanent --add-port=10050/tcp
firewall-cmd --reload


service zabbix-agent start
service zabbix-agent status
#There should be a empty line here, so XShell will sent an Enter for you.
```