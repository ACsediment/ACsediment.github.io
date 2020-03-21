---
layout: post
title: "Monitoring Windows User Login with Zabbix | 使用Zabbix监控Windows用户登录"
date: 2019-08-29 00:00:00 -0000
categories: Win, Ops
---

As we all know, Zabbix has a Windows-specific item key called "eventlog" for Windows platform event log monitoring. That means we could configure Zabbix to monitor certain events like user login or some brute force attempt.

It is quite easy to find a step-by-step blog post about how to monitor user login event with Zabbix, but most of them, especially those written ( or sometimes copied :P ) in Chinese, are just simply specify an event ID, capture all relative logs, then send to your email. That might become a disaster if you happen to have hundreds of Windows server to watch like I do now. A Windows server may generate tons of login events (mostly caused by system services) during your bedtime. Notifications triggered by these events could cover up those you really want to see and make the hole things unusable(as I called a "Alarm message Flooding Attack" or "告警洪水攻击" in Chinese lol).

To fix this, I have been working on it for hours and here is my solution:

## Create item

![zabbix_win_login_create_item.png](\images\Monitoring_User_Login_with_Zabbix\create_item.png)

<dl>
<dt>Type: </dt>
<dd>Zabbix agent (active)</dd>
<dt>key: </dt>
<dd>eventlog[Security,"User32","Success Audit",,^4624$,,skip]</dd>
<dt>Type of information:</dt>
<dd>Log</dd>
</dl>

Make sure you choose the “Zabbix agent(active)” type. And you have to config your hostname correctly, or you will get warnings like these in you zabbix-agent log:

zabbix配置为active，同时要确保hostname填写正确，因为agent是基于hostname来查找检查清单的。如果hostname不正确而IP地址正确，被动监控正常运作，但主动监控会查找失败。eg:

> Active check configuration update from [Acsediment-server:10051] is working again.<br>
> No active checks on server [Acsediment-server:10051]: host [Acsediment-client] not found.

Usually people use this item key without the second parameter "User32". The parameter is a reg expression describing the required pattern, using the string "User32" we can find out login events which contain "LogonProcessName = User32 ".

There are four kinds of "LogonProcessName": "Kerberos", "User32 ", "Advapi ", and "Negotiate". (Notice that there is a space in "User32 " and "Advapi ", it took me quite a long time to skip this trap while trying to add xpath-filter in the event viewer.) Basically, only "User32 " is useful for those who want to monitor RDP/console login.

See [LogonType] for more information about login type.

For now, we can successfully filter out those unnecessary events, go check "Latest data". If everything goes well, you might be able to see another problem here. 

![event_latest_data_long.png](\images\Monitoring_User_Login_with_Zabbix\event_latest_data_long.png)

As we can see from above, the event log is too long to be sent directly to your email or IM, so now we can try to shorten it, leave only useful information we need. 
Go back to item config page and you can see a "Preprocessing" tab. It allows you to process the data using multiple steps and different methods. Here we choose "Regular expression", input(this example is for Chinese version of Windows) 

> 登录类型:\s*([0-9])[\s\S]*帐户名:\s*(\S*)[\s]*帐户域:\s*(\S*)\s*登录[\s\S]*工作站名:\s*(\S*)\s*源网络地址:\s*(\S*)\s*源端口

in "Parameters", and

> 登录类型:\1, 帐户名:\2, 帐户域:\3, 工作站名:\4, 源网络地址:\5

in the blank followed. This means FIND using "Parameters" in the data string, and REPLACE it using the second text area.

Now, go check "Latest data" again, I think you will like it.

![zabbix user login event latest data short](\images\Monitoring_User_Login_with_Zabbix\event_latest_data_short.png)

## Create Trigger

The event value is now short and clear, good enough for an IM alert message. You may config the trigger as you like. Here is mine as an example.

![Triggers of login monitor.png](\images\Monitoring_User_Login_with_Zabbix\triggers.png)

The first one:
<dl>
<dt>Name:</dt>
<dd>Multiple failed login attempt detected.</dd>
<dt>Problem Expression:</dt>
<dd>{LoginMonitor:eventlog[Security,,"Failure Audit",,^4625$,,skip].count(3m)}>3</dd>
<dt>Recovery Expression:</dt>
<dd>{LoginMonitor:eventlog[Security,,"Failure Audit",,^4625$,,skip].nodata(2d)}=1</dd>
</dl>

If 3 failed login attempt detected within 3 minutes, it will trigger a problem. Administrators can confirm and close the problem manually. And after 2 days the problem can be closed automatically.

The second one:
<dl>
<dt>Name:</dt>
<dd>No login detected for a long time.</dd>
<dt>Problem Expression:</dt>
<dd>{LoginMonitor:eventlog[Security,"User32","Success Audit",,^4624$,,skip].nodata(60d)}=1</dd>
</dl>

If no login detected for more than 60 days, it will trigger a problem.
