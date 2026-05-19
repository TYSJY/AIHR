MERGE INTO sys_config KEY(config_key) VALUES
(1001, 'company_name', 'AIHR智聘', 'company', '公司名称', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1002, 'company_intro', 'AIHR智聘是一套面向智能招聘场景的职位发布、简历投递与候选人筛选系统。', 'company', '公司简介', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1003, 'company_benefits', '["AI简历解析","职位智能匹配","私有化部署","招聘流程看板"]', 'company', '公司福利', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1004, 'company_industry', '智能招聘 SaaS', 'company', '所属行业', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1005, 'company_scale', '成长型团队', 'company', '公司规模', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

MERGE INTO job_position KEY(id) VALUES
(1001, '高级前端工程师', 2, 'full_time', '上海', '上海 · 混合办公', 25, 40, 14, '本科及以上', '3-5年', 2,
'负责 AIHR智聘官网与招聘投递体验建设，参与候选人端交互、数据看板和组件体系优化。',
'熟悉 React、TypeScript 与工程化实践，关注性能、可访问性和用户体验，有招聘或 SaaS 产品经验优先。',
'核心产品岗位，参与 AI 招聘体验从 0 到 1 打磨。', 1, 1, CURRENT_DATE, DATEADD('MONTH', 2, CURRENT_DATE), 1, 0, 0,
'["React","TypeScript","SaaS","AI招聘"]', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1, 0),
(1002, 'AI产品经理', 3, 'full_time', '远程', '远程协作', 20, 35, 14, '本科及以上', '3年以上', 1,
'负责 AI 简历解析、职位匹配、候选人流程等智能招聘能力的需求规划与落地。',
'具备 B 端产品经验，能把复杂流程拆解成清晰的产品方案，理解大模型应用边界。',
'远程友好，直接参与核心 AI 招聘能力设计。', 1, 0, CURRENT_DATE, DATEADD('MONTH', 2, CURRENT_DATE), 1, 0, 0,
'["大模型","B端产品","招聘流程","数据分析"]', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1, 0),
(1003, '招聘运营实习生', 4, 'intern', '北京', '北京 · 朝阳', 4, 6, 12, '本科在读', '经验不限', 2,
'协助维护职位信息、跟进候选人投递流程，整理招聘数据与面试反馈。',
'沟通细致，熟悉办公软件，对 HR Tech 和 AI 工具有兴趣。',
'适合想了解智能招聘产品和招聘运营流程的同学。', 1, 0, CURRENT_DATE, DATEADD('MONTH', 3, CURRENT_DATE), 1, 0, 0,
'["实习","招聘运营","HR Tech"]', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1, 0);
