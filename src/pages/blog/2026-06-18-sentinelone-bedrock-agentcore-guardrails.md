---
layout: ../../layouts/PostLayout.astro
title: SentinelOne 接入 Bedrock AgentCore，智能体安全开始从“提示词过滤”升级到“网关级管控”
description: SentinelOne 于 2026 年 6 月 17 日宣布将 Prompt Security 接入 Amazon Bedrock AgentCore，企业部署 AI 智能体的安全控制正在向统一网关收敛。
pubDate: 2026-06-18
tags: ["AI安全", "智能体工作流", "AWS"]
readingTime: "4 分钟"
---

SentinelOne 在 6 月 17 日宣布，计划把 Prompt Security 接入 Amazon Bedrock AgentCore，通过网关层为企业智能体提供运行时护栏。这个变化值得关注，因为它代表企业对智能体安全的思路正在升级: 不再只盯模型输入输出，而是开始在统一入口上做策略控制。

当智能体只是聊天助手时，很多企业会把安全理解成提示词注入、敏感词过滤或内容审核。但一旦智能体开始调用工具、访问数据、联动其他智能体，风险面就完全不同了。这个时候如果还只靠单点检测，往往来不及。

AgentCore 这类平台的价值，在于把 agent-to-tool、agent-to-LLM、agent-to-agent 的流量放到同一个策略门口。SentinelOne 提供的检测信号再交给这个网关执行，相当于企业终于有机会把“发现风险”和“自动阻断”放进一条链路里。对运维、法务和安全团队来说，这会比零散上补丁更可管理。

对于准备在 AWS 上扩展 AI 工作流的公司，这条新闻的现实含义是: 以后选型不能只看模型和编排器，还要看安全能力是不是原生接进去。没有统一控制层，智能体越多，审计和合规压力只会指数级上升。

AI 项目进入生产后，真正拉开差距的往往不是回答质量，而是出问题时谁能更快定位、隔离和恢复。谁先把护栏建在流量入口，谁就更有机会把智能体从试点安全地带到规模化运营。
