/* ══════════════════════════════════════════════════════
   content.js — 全站内容数据（★ 改内容只需要改这一个文件）
   换项目截图：把图片放进 assets/img/projects/，改下面的 img 路径
   ══════════════════════════════════════════════════════ */

const SITE_CONTENT = {
  profile: {
    name: '姚懿宸',
    nameEn: 'Yichen Yao',
    email: '22621037@zju.edu.cn',
    heroRoles: [
      '浙江大学 · 人工智能研究所硕士生',
      'Embodied AI / 3D Visual Grounding Researcher',
      'AAAI 2026 一作论文',
      '让机器人真正理解三维世界',
    ],
    aboutParas: [
      '我是姚懿宸，<strong>浙江大学人工智能研究所</strong>硕士（导师：宋明黎教授、刘振宇研究员），研究方向为 <span class="hl">具身智能与智能机器人</span> 中的三维视觉语言理解，重点关注机器人如何在真实三维场景中完成开放词汇的定位与决策。',
      '围绕「<span class="hl">3D 具身理解 + 视觉定位 + 多模态语言建模</span>」形成了系统的研究路线：从复现 ScanRefer 三维指代表达理解工作，到构建基于 3DGS 与 VLM 的三维视觉定位系统，再到提出具身导航统一强化学习框架 <strong>UniRL</strong>（AAAI 2026 一作）并持续迭代，具备较为完整的科研训练与项目落地能力。',
      '2027 届应届硕士毕业生，希望在具身智能、3D 视觉方向继续深耕；同时对 AIGC、视频理解、视频生成等方向抱有开放探索兴趣。',
    ],
    facts: [
      { label: '研究方向', value: '3D Visual Grounding / Embodied AI' },
      { label: '坐标', value: '杭州' },
      { label: '求职状态', value: '2027 届应届' },
    ],
  },

  social: [
    { label: 'GitHub', url: 'https://github.com/chenxi0817', iconKey: 'github' },
    { label: 'Email', url: 'mailto:22621037@zju.edu.cn', iconKey: 'mail' }, 
    // 如有 Google Scholar / 知乎 / LinkedIn，按同样格式添加，iconKey 可选 scholar / zhihu / linkedin
  ],

  skills: [
    {
      group: '编程语言',
      items: [
        { name: 'Python', level: 0.95, note: '主力语言' },
        { name: 'C++', level: 0.8, note: '工程与算法落地' },
        { name: 'SQL', level: 0.6, note: '数据分析' },
      ],
    },
    {
      group: 'CV & 3D 视觉',
      items: [
        { name: 'Visual Grounding', level: 0.9 },
        { name: 'CLIP', level: 0.9 },
        { name: '3DGS', level: 0.85 },
        { name: 'OpenCV', level: 0.85 },
        { name: 'SLAM / VIO', level: 0.75 },
        { name: 'NeRF', level: 0.7 },
      ],
    },
    {
      group: '深度学习与多模态',
      items: [
        { name: 'PyTorch', level: 0.95 },
        { name: 'Transformers / VLM', level: 0.9 },
        { name: '模型微调 / LoRA·QLoRA', level: 0.9 },
        { name: 'PEFT', level: 0.85 },
        { name: '分布式训练 / DDP', level: 0.75 },
        { name: 'FlashAttention / 训练加速', level: 0.7 },
      ],
    },
    {
      group: '工程与协作',
      items: [
        { name: 'Git / GitHub', level: 0.85 },
        { name: 'Linux 开发环境', level: 0.8 },
        { name: 'WandB 实验管理', level: 0.7 },
      ],
    },
  ],

  projects: [
    {
      title: 'UniRL：具身导航统一强化学习框架',
      subtitle: '3D 场景理解 · 具身导航 · 视觉语言模型（AAAI 2026 一作）',
      badge: 'AAAI 2026 · 一作',
      badgeStyle: 'gold',
      img: 'assets/img/projects/placeholder-unirl.svg',
      techTags: ['具身导航', '3D 场景理解', '强化学习', '视觉语言模型'],
      desc: '提出「理解 → 预测 → 决策」闭环式导航框架，设计 3D-aware 统一目标建模，支持多类型指令与多形态平台，在 8 个 3D 具身导航基准测试上均实现 SOTA。',
      links: {
        code: 'https://github.com/chenxi0817', // TODO: 论文开源后替换为具体仓库
        paper: null,                             // TODO: arXiv / AAAI 页面链接
        demo: null,
      },
    },
    {
      title: '基于 3DGS + VLM 的三维视觉定位系统',
      subtitle: '三维视觉定位 · 开放词汇导航（科研项目）',
      img: 'assets/img/projects/placeholder-3dgs-vlm.svg',
      techTags: ['OpenVLA', '3DGS', 'ScanNet++', 'SFT'],
      desc: '基于 OpenVLA 与 3D Gaussian Splatting 构建开放词汇 Grounding 能力，支持通过自然语言实现空间级/对象级定位，输出带世界坐标的语义化描述，为下游机器人任务提供可执行的三维场景先验。',
      links: { code: 'https://github.com/chenxi0817', paper: null, demo: null },
    },
    {
      title: 'MUSE：音乐语义增强的多模态大模型',
      subtitle: '音乐生成 · 多模态理解（EMNLP 2025 UNDER REVIEW，一作）',
      badge: 'EMNLP 2025 · 一作',
      img: 'assets/img/projects/placeholder-muse.svg',
      techTags: ['多模态大模型', 'Qwen-VL', 'Benchmark', '音乐理解'],
      desc: '构建多模态音乐理解 Benchmark，提出基于 Qwen-VL、音乐语义增强的原生多模态统一模型 MUSE，实现音乐生成和理解上的 SOTA 表现。',
      links: { code: 'https://github.com/chenxi0817', paper: null, demo: null },
    },
    {
      title: 'ReferScene3D：三维视觉定位复现项目',
      subtitle: 'ScanRefer 复现 · 文本 → 3D 检测框',
      img: 'assets/img/projects/placeholder-referscene3d.svg',
      techTags: ['PyTorch', 'ScanRefer', 'ScanNet', '3D Scene Graph'],
      desc: '完整复现 ScanRefer 的训练与评估流程，能够在 ScanNet 三维室内场景中实现「文本 → 3D 检测框」预测，并完成基于 3D 场景图的特征增强模块验证，复现指标与原文对齐。',
      links: { code: 'https://github.com/chenxi0817', paper: null, demo: null },
    },
  ],

  timeline: [
    {
      period: '2024.09 – 2027.06',
      title: '浙江大学 · 硕士',
      org: '人工智能 · 人工智能研究所',
      detail: '具身智能与 3D 视觉语言理解方向，导师宋明黎教授、刘振宇研究员。一作发表 AAAI 2026（UniRL），一作投稿 EMNLP 2025（MUSE）。',
    },
    {
      period: '2026',
      title: 'AAAI 2026 · 一作论文',
      org: '学术里程碑',
      detail: 'UniRL：面向具身导航的统一强化学习框架，8 个 3D 具身导航基准 SOTA。',
    },
    {
      period: '2025',
      title: 'EMNLP 2025 · 一作投稿',
      org: '学术里程碑',
      detail: 'MUSE：音乐语义增强的原生多模态统一模型（UNDER REVIEW）。',
    },
    {
      period: '2020.09 – 2024.06',
      title: '中国人民大学 · 本科',
      org: '理科试验班（统计学）· GPA 3.48 / 4',
      detail: '系统掌握概率论、数理统计、回归分析、多元统计分析与统计计算，形成扎实的数理与数据分析基础，支撑后续 AI 科研中的模型设计与实验分析。',
    },
  ],

  footer: { note: 'Built with vanilla HTML / CSS / JS' },
};
