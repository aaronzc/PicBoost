export type Lang = "en" | "zh"

export interface Translations {
  // Navigation
  nav: {
    enhance: string
    upscale: string
    unblur: string
    pricing: string
    signIn: string
    tryFree: string
  }
  // Footer
  footer: {
    brandDesc: string
    copyright: string
    product: string
    resources: string
    legal: string
    imageEnhancer: string
    imageUpscaler: string
    unblurPhoto: string
    blog: string
    api: string
    privacy: string
    terms: string
  }
  // Home page
  home: {
    badge: string
    h1: string
    h1Highlight: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    dailyFree: string
    featuresTitle: string
    featuresSubtitle: string
    features: Array<{ title: string; desc: string }>
    howTitle: string
    howSubtitle: string
    howSteps: Array<{ title: string; desc: string }>
    socialTitle: string
    testimonials: Array<{ name: string; role: string; text: string }>
    ctaTitle: string
    ctaDesc: string
    ctaButton: string
  }
  // Enhance page
  enhance: {
    title: string
    subtitle: string
  }
  // Upscale page
  upscale: {
    title: string
    subtitle: string
  }
  // Unblur page
  unblur: {
    title: string
    subtitle: string
  }
  // Workbench
  workbench: {
    quotaText: string
    runningLow: string
    limitReached: string
    enhance: string
    upscale: string
    unblur: string
    dragDrop: string
    orClick: string
    readyToEnhance: string
    readySize: string
    enhanceButton: string
    limitMessage: string
    limitMessageCta: string
    enhancing: string
    enhancingDesc: string
    progressLabel: string
    processing: string
    complete: string
    noWatermark: string
    newImage: string
    download: string
    downloading: string
  }
  // Pricing page
  pricing: {
    title: string
    subtitle: string
    plans: Array<{
      name: string
      price: string
      period: string
      desc: string
      features: string[]
      cta: string
      popular: boolean
    }>
    faqTitle: string
    faqs: Array<{ q: string; a: string }>
  }
  // Blog page
  blog: {
    title: string
    subtitle: string
    readTime: string
    posts: Array<{ slug: string; title: string; excerpt: string; date: string; readTime: string }>
  }
  // Blog post
  blogPost: {
    backToBlog: string
    ctaTitle: string
    ctaDesc: string
    ctaButton: string
  }
  // Competitor page
  vs: {
    title: string
    subtitle: string
    feature: string
    picboost: string
    tryTitle: string
    tryDesc: string
    tryButton: string
  }
}

const en: Translations = {
  nav: {
    enhance: "Enhance",
    upscale: "Upscale",
    unblur: "Unblur",
    pricing: "Pricing",
    signIn: "Sign In",
    tryFree: "Try Free →",
  },
  footer: {
    brandDesc: "Free AI image enhancement. No watermark, no sign-up required.",
    copyright: "All rights reserved.",
    product: "Product",
    resources: "Resources",
    legal: "Legal",
    imageEnhancer: "Image Enhancer",
    imageUpscaler: "Image Upscaler",
    unblurPhoto: "Unblur Photo",
    blog: "Blog",
    api: "API",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  },
  home: {
    badge: "AI-Powered Image Enhancement",
    h1: "Enhance Your Images",
    h1Highlight: "Free, No Watermark, No Sign Up",
    subtitle: "Upload any photo and let AI enhance it instantly — sharpen, denoise, upscale to 4K, completely free.",
    ctaPrimary: "Enhance Image Free →",
    ctaSecondary: "View Pricing",
    dailyFree: "5 free enhancements daily • No account needed • No watermark",
    featuresTitle: "Why PicBoost?",
    featuresSubtitle: "Unlike other tools, we don't watermark your images or force you to sign up.",
    features: [
      { title: "AI Enhancement", desc: "Automatic sharpening, noise reduction, and color correction powered by Real-ESRGAN." },
      { title: "Super Resolution", desc: "Upscale images up to 4x, reaching 4K resolution while preserving details." },
      { title: "Instant Results", desc: "Get enhanced images in seconds. No waiting, no queues for basic usage." },
      { title: "No Watermark", desc: "Your enhanced images are clean. No logos, no watermarks, ever." },
    ],
    howTitle: "How It Works",
    howSubtitle: "Three simple steps to better images.",
    howSteps: [
      { title: "Upload", desc: "Drag & drop or click to upload your image" },
      { title: "Enhance", desc: "AI processes your image automatically" },
      { title: "Download", desc: "Preview & download your enhanced image" },
    ],
    socialTitle: "Loved by Creators",
    testimonials: [
      { name: "Sarah K.", role: "Etsy Seller", text: "My product photos look professional now. No more blurry listings!" },
      { name: "Mike R.", role: "Photographer", text: "Finally a tool that doesn't watermark my own photos. Game changer." },
      { name: "Lisa T.", role: "Content Creator", text: "Fixed all my old blog images in 10 minutes. The quality difference is insane." },
    ],
    ctaTitle: "Ready to enhance your images?",
    ctaDesc: "Start with 5 free enhancements. No credit card required.",
    ctaButton: "Get Started Free",
  },
  enhance: {
    title: "AI Image Enhancer",
    subtitle: "Upload any image and let AI automatically enhance sharpness, reduce noise, and correct colors. Free, no watermark, no sign-up required.",
  },
  upscale: {
    title: "AI Image Upscaler",
    subtitle: "Upscale your images up to 4x with AI super-resolution technology. Get crystal-clear 4K images from low-resolution originals.",
  },
  unblur: {
    title: "Unblur Photos with AI",
    subtitle: "Turn blurry photos into sharp, clear images. Our AI detects and fixes motion blur, focus blur, and general softness.",
  },
  workbench: {
    quotaText: "free enhancements today",
    runningLow: "Running low!",
    limitReached: "Limit reached",
    enhance: "Enhance",
    upscale: "Upscale",
    unblur: "Unblur",
    dragDrop: "Drag & drop your image",
    orClick: "or click to browse files",
    readyToEnhance: "Ready to enhance",
    readySize: "MB",
    enhanceButton: "Enhance Image",
    limitMessage: "You've used all free enhancements today.",
    limitMessageCta: "check our plans",
    enhancing: "Enhancing your image...",
    enhancingDesc: "AI is working its magic. This usually takes 5–15 seconds.",
    progressLabel: "complete",
    processing: "Processing...",
    complete: "Enhancement complete! No watermark applied.",
    noWatermark: "No watermark applied.",
    newImage: "New Image",
    download: "Download",
    downloading: "Downloading...",
  },
  pricing: {
    title: "Simple, Transparent Pricing",
    subtitle: "Start free, no credit card required. Upgrade anytime.",
    plans: [
      {
        name: "Free", price: "$0", period: "/forever",
        desc: "Perfect for trying out AI enhancement",
        features: ["5 images per day", "2x upscale (up to 2K)", "No watermark", "No sign-up required", "Standard processing speed", "Basic enhancement modes"],
        cta: "Start Free →", popular: false,
      },
      {
        name: "Starter", price: "$9.9", period: "/month",
        desc: "For creators and small businesses",
        features: ["50 images per day", "4x upscale (up to 4K)", "No watermark", "All enhancement modes", "Background removal", "Batch processing (10 images)", "Priority processing speed", "Save processing history"],
        cta: "Get Starter", popular: true,
      },
      {
        name: "Pro", price: "$19.9", period: "/month",
        desc: "For professionals and agencies",
        features: ["Unlimited images", "8x upscale (up to 8K)", "No watermark", "All enhancement modes", "Background removal", "Unlimited batch processing", "Fastest processing speed", "Save processing history", "API access"],
        cta: "Get Pro", popular: false,
      },
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      { q: "Is there really no watermark?", a: "Correct! Unlike other tools, PicBoost never adds watermarks to your images, even on the free plan." },
      { q: "What file formats are supported?", a: "We support JPG, PNG, and WebP input formats. Output is available in PNG or JPG." },
      { q: "What's the maximum file size?", a: "You can upload images up to 10MB in size." },
      { q: "Do I need to create an account?", a: "No! You can use PicBoost without any account. Sign up to get more daily enhancements and save history." },
      { q: "Can I cancel anytime?", a: "Yes, all subscriptions can be cancelled anytime. No questions asked." },
    ],
  },
  blog: {
    title: "PicBoost Blog",
    subtitle: "Tips, tutorials, and insights on AI image enhancement and photo editing.",
    readTime: "read",
    posts: [
      { slug: "best-ai-image-enhancers-2026", title: "Best Free AI Image Enhancers in 2026 (Compared)", excerpt: "A comprehensive comparison of the top free AI image enhancement tools, including features, pricing, and quality benchmarks.", date: "2026-03-20", readTime: "8 min" },
      { slug: "upscale-product-photos", title: "How to Upscale Product Photos for E-commerce", excerpt: "Learn how to enhance your Shopify, Etsy, and Amazon product images with AI to increase conversions and sales.", date: "2026-03-18", readTime: "6 min" },
      { slug: "ai-vs-traditional-image-editing", title: "AI vs Traditional Image Editing: When to Use Each", excerpt: "Understanding when AI enhancement is the right choice and when traditional tools like Photoshop are still needed.", date: "2026-03-15", readTime: "5 min" },
      { slug: "old-photo-restoration-guide", title: "Complete Guide to AI Old Photo Restoration", excerpt: "Step-by-step guide on using AI to restore, enhance, and colorize old family photographs.", date: "2026-03-10", readTime: "10 min" },
      { slug: "social-media-image-sizes-2026", title: "Social Media Image Size Guide 2026 (All Platforms)", excerpt: "Complete reference for image dimensions on Instagram, Facebook, Twitter/X, LinkedIn, TikTok, and more.", date: "2026-03-05", readTime: "7 min" },
      { slug: "what-is-ai-super-resolution", title: "What is AI Super Resolution? Explained Simply", excerpt: "How AI can create high-resolution images from low-resolution originals, and the technology behind it.", date: "2026-03-01", readTime: "5 min" },
    ],
  },
  blogPost: {
    backToBlog: "Blog",
    ctaTitle: "Ready to enhance your images?",
    ctaDesc: "Try PicBoost free. No sign-up, no watermark.",
    ctaButton: "Enhance Images Free →",
  },
  vs: {
    title: "PicBoost vs",
    subtitle: "How does PicBoost compare to",
    feature: "Feature",
    picboost: "PicBoost",
    tryTitle: "Try PicBoost Free",
    tryDesc: "No sign-up required. No watermark. 5 free images per day.",
    tryButton: "Enhance Your First Image",
  },
}

const zh: Translations = {
  nav: {
    enhance: "增强",
    upscale: "放大",
    unblur: "去模糊",
    pricing: "定价",
    signIn: "登录",
    tryFree: "免费试用 →",
  },
  footer: {
    brandDesc: "免费 AI 图片增强工具。无水印，无需注册。",
    copyright: "保留所有权利。",
    product: "产品",
    resources: "资源",
    legal: "法律",
    imageEnhancer: "图片增强器",
    imageUpscaler: "图片放大器",
    unblurPhoto: "照片去模糊",
    blog: "博客",
    api: "API",
    privacy: "隐私政策",
    terms: "服务条款",
  },
  home: {
    badge: "AI 驱动的图片增强",
    h1: "增强你的图片",
    h1Highlight: "免费、无水印、无需注册",
    subtitle: "上传照片，AI 即刻增强。锐化、降噪、4K 放大——完全免费。",
    ctaPrimary: "免费增强图片 →",
    ctaSecondary: "查看定价",
    dailyFree: "每日 5 次免费增强 · 无需账号 · 无水印",
    featuresTitle: "为什么选择 PicBoost？",
    featuresSubtitle: "与其他工具不同，我们不会给图片加水印或强制注册。",
    features: [
      { title: "AI 智能增强", desc: "基于 Real-ESRGAN 的自动锐化、降噪和色彩校正。" },
      { title: "超分辨率放大", desc: "将图片放大最多 4 倍，达到 4K 分辨率，同时保留细节。" },
      { title: "即时出结果", desc: "几秒钟内获得增强后的图片。基础使用无需排队等待。" },
      { title: "无水印", desc: "增强后的图片干净清爽。没有 Logo，没有水印，永远不会。" },
    ],
    howTitle: "使用方法",
    howSubtitle: "三个简单步骤，让图片更清晰。",
    howSteps: [
      { title: "上传", desc: "拖拽或点击上传图片" },
      { title: "增强", desc: "AI 自动处理你的图片" },
      { title: "下载", desc: "预览并下载增强后的图片" },
    ],
    socialTitle: "深受创作者喜爱",
    testimonials: [
      { name: "Sarah K.", role: "Etsy 卖家", text: "我的商品图现在看起来专业多了。再也没有模糊的商品列表了！" },
      { name: "Mike R.", role: "摄影师", text: "终于有个工具不会给我的照片加水印了。游戏规则改变者。" },
      { name: "Lisa T.", role: "内容创作者", text: "10 分钟修好了我所有旧博客图片。质量差异太惊人了。" },
    ],
    ctaTitle: "准备好增强你的图片了吗？",
    ctaDesc: "5 次免费增强，无需信用卡。",
    ctaButton: "开始免费使用",
  },
  enhance: {
    title: "AI 图片增强器",
    subtitle: "上传任意图片，让 AI 自动增强锐度、降低噪点、校正色彩。免费、无水印、无需注册。",
  },
  upscale: {
    title: "AI 图片放大器",
    subtitle: "使用 AI 超分辨率技术将图片放大最多 4 倍。从低分辨率原图获得清晰的 4K 图片。",
  },
  unblur: {
    title: "AI 照片去模糊",
    subtitle: "将模糊的照片变成清晰锐利的图像。我们的 AI 能检测并修复运动模糊、对焦模糊和整体模糊。",
  },
  workbench: {
    quotaText: "次免费增强（今日）",
    runningLow: "快用完了！",
    limitReached: "已达上限",
    enhance: "增强",
    upscale: "放大",
    unblur: "去模糊",
    dragDrop: "拖拽图片到这里",
    orClick: "或点击浏览文件",
    readyToEnhance: "准备增强",
    readySize: "MB",
    enhanceButton: "增强图片",
    limitMessage: "今天的免费增强次数已用完。",
    limitMessageCta: "查看套餐",
    enhancing: "正在增强图片...",
    enhancingDesc: "AI 正在处理中，通常需要 5-15 秒。",
    progressLabel: "完成",
    processing: "处理中...",
    complete: "增强完成！无水印。",
    noWatermark: "无水印。",
    newImage: "新图片",
    download: "下载",
    downloading: "下载中...",
  },
  pricing: {
    title: "简单透明的定价",
    subtitle: "免费开始，无需信用卡。随时升级。",
    plans: [
      {
        name: "免费版", price: "$0", period: "/永久",
        desc: "体验 AI 增强的完美选择",
        features: ["每天 5 张图片", "2 倍放大（最高 2K）", "无水印", "无需注册", "标准处理速度", "基础增强模式"],
        cta: "免费开始 →", popular: false,
      },
      {
        name: "入门版", price: "$9.9", period: "/月",
        desc: "适合创作者和小型企业",
        features: ["每天 50 张图片", "4 倍放大（最高 4K）", "无水印", "全部增强模式", "背景去除", "批量处理（10 张）", "优先处理速度", "保存处理历史"],
        cta: "订阅入门版", popular: true,
      },
      {
        name: "专业版", price: "$19.9", period: "/月",
        desc: "适合专业人士和代理机构",
        features: ["无限图片", "8 倍放大（最高 8K）", "无水印", "全部增强模式", "背景去除", "无限批量处理", "最快处理速度", "保存处理历史", "API 接口"],
        cta: "订阅专业版", popular: false,
      },
    ],
    faqTitle: "常见问题",
    faqs: [
      { q: "真的没有水印吗？", a: "没错！与其他工具不同，PicBoost 永远不会在您的图片上添加水印，即使是免费计划。" },
      { q: "支持哪些文件格式？", a: "支持 JPG、PNG 和 WebP 输入格式。输出可选 PNG 或 JPG。" },
      { q: "最大文件大小是多少？", a: "您可以上传最大 10MB 的图片。" },
      { q: "需要创建账户吗？", a: "不需要！您可以直接使用 PicBoost，无需注册。注册可获得更多每日增强次数和保存历史。" },
      { q: "可以随时取消订阅吗？", a: "当然可以，所有订阅都可以随时取消，无需任何理由。" },
    ],
  },
  blog: {
    title: "PicBoost 博客",
    subtitle: "AI 图片增强和照片编辑的技巧、教程和见解。",
    readTime: "分钟阅读",
    posts: [
      { slug: "best-ai-image-enhancers-2026", title: "2026 年最佳免费 AI 图片增强工具对比", excerpt: "全面对比市面上顶级免费 AI 图片增强工具，涵盖功能、定价和质量基准测试。", date: "2026-03-20", readTime: "8" },
      { slug: "upscale-product-photos", title: "如何放大电商产品图片", excerpt: "学习如何用 AI 增强 Shopify、Etsy 和 Amazon 商品图片，提升转化率和销量。", date: "2026-03-18", readTime: "6" },
      { slug: "ai-vs-traditional-image-editing", title: "AI vs 传统图片编辑：什么时候用哪个？", excerpt: "了解什么时候该用 AI 增强，什么时候 Photoshop 等传统工具仍然是更好的选择。", date: "2026-03-15", readTime: "5" },
      { slug: "old-photo-restoration-guide", title: "AI 老照片修复完整指南", excerpt: "使用 AI 修复、增强和上色老照片的分步指南。", date: "2026-03-10", readTime: "10" },
      { slug: "social-media-image-sizes-2026", title: "社交媒体图片尺寸指南 2026（全平台）", excerpt: "Instagram、Facebook、Twitter/X、LinkedIn、TikTok 等平台的图片尺寸完整参考。", date: "2026-03-05", readTime: "7" },
      { slug: "what-is-ai-super-resolution", title: "什么是 AI 超分辨率？简单易懂的解释", excerpt: "了解 AI 如何从低分辨率原图创建高分辨率图片，以及背后的技术原理。", date: "2026-03-01", readTime: "5" },
    ],
  },
  blogPost: {
    backToBlog: "博客",
    ctaTitle: "准备好增强你的图片了吗？",
    ctaDesc: "免费试用 PicBoost，无需注册，无水印。",
    ctaButton: "免费增强图片 →",
  },
  vs: {
    title: "PicBoost vs",
    subtitle: "PicBoost 与以下工具相比如何？",
    feature: "功能",
    picboost: "PicBoost",
    tryTitle: "免费试用 PicBoost",
    tryDesc: "无需注册，无水印，每天 5 张免费。",
    tryButton: "增强你的第一张图片",
  },
}

export const translations: Record<Lang, Translations> = { en, zh }

export function getLang(pathname: string): Lang {
  return pathname.startsWith("/zh") ? "zh" : "en"
}
