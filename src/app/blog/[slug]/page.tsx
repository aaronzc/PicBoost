"use client"

import { Header } from "@/components/features/header"
import { Footer } from "@/components/features/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useLang } from "@/components/providers/lang-provider"

// Blog full content - English
const BLOG_CONTENT: Record<string, string> = {
  "best-ai-image-enhancers-2026": `
# Best Free AI Image Enhancers in 2026

AI image enhancement has come a long way. In this comprehensive comparison, we look at the top free tools available today.

## What to Look For

When choosing an AI image enhancer, consider these factors:

1. **Free tier generosity** - How many images can you process for free?
2. **Watermark policy** - Does the free version add watermarks?
3. **Sign-up requirements** - Can you use it without creating an account?
4. **Output quality** - How good are the enhanced results?
5. **Speed** - How fast is the processing?

## Our Top Picks

### 1. PicBoost
- ✅ 5 free images per day (resets daily)
- ✅ No watermark, ever
- ✅ No sign-up required
- ✅ 2x-4x upscaling
- ✅ Enhance, Upscale, Unblur modes

### 2. Let's Enhance
- ⚠️ 5 free images (one-time)
- ❌ Watermark on free tier
- ❌ Sign-up required
- ✅ Good quality results

### 3. Upscale.media
- ⚠️ Limited free tier
- ❌ Watermark on free tier
- ❌ Sign-up required
- ✅ Fast processing

## Conclusion

For casual users who need occasional image enhancement, **PicBoost** offers the best free experience with no watermark and no sign-up requirement.
  `,
  "upscale-product-photos": `
# How to Upscale Product Photos for E-commerce

High-quality product images are essential for online sales. Studies show that 75% of online shoppers rely on product images when making purchase decisions.

## Why Image Quality Matters

- **Higher conversion rates**: Clear, detailed images increase buyer confidence
- **Reduced returns**: Accurate images set correct expectations
- **Better SEO**: Google favors pages with high-quality, properly optimized images

## Step-by-Step Guide

### 1. Prepare Your Source Images
Start with the highest quality original you have. Even if it's blurry or low-res, AI upscaling can significantly improve it.

### 2. Use AI Upscaling
Upload your image to PicBoost and select the Upscale mode. Choose 2x for standard improvements or 4x for maximum quality.

### 3. Optimize for Your Platform
Each platform has specific requirements:
- **Shopify**: 2048x2048px recommended
- **Amazon**: At least 1000px on longest side
- **Etsy**: 2000px width recommended

### 4. Batch Process (Paid Plans)
For sellers with large catalogs, use batch processing to enhance multiple images at once.

## Pro Tips
- Always keep originals as backup
- Use consistent lighting in product photos
- Test different enhancement modes for best results
  `,
  "ai-vs-traditional-image-editing": `
# AI vs Traditional Image Editing: When to Use Each

The rise of AI image enhancement tools has changed the game, but traditional editors like Photoshop still have their place.

## When to Use AI Enhancement

AI tools like PicBoost are ideal for:
- **Quick fixes**: Sharpening, noise reduction, color correction
- **Upscaling**: Increasing image resolution
- **Deblurring**: Fixing motion blur or focus issues
- **Batch processing**: Handling multiple images efficiently

## When to Use Traditional Editors

Photoshop and similar tools are better for:
- **Complex compositing**: Combining multiple images
- **Precise retouching**: Detailed skin retouching, object removal
- **Creative effects**: Artistic filters, complex layering
- **Print preparation**: CMYK conversion, precise color matching

## The Best of Both Worlds

Many professionals use both:
1. Use AI tools for initial enhancement
2. Fine-tune in traditional editors
3. Use AI again for final optimization

## Cost Comparison

| Tool | Cost | Best For |
|------|------|----------|
| PicBoost | Free-$19.9/mo | Quick enhancement, upscaling |
| Photoshop | $22.99/mo | Complex editing, design |
| GIMP | Free | Full-featured alternative |
  `,
  "old-photo-restoration-guide": `
# Complete Guide to AI Old Photo Restoration

Old family photographs are precious, but time takes its toll. AI technology can now restore these memories to their former glory.

## Common Issues with Old Photos

- **Fading**: Colors and contrast degrade over time
- **Scratches and damage**: Physical wear and tear
- **Blur**: Age-related softness or original low quality
- **Noise**: Film grain and scanning artifacts

## Step-by-Step Restoration Process

### Step 1: Digitize Your Photo
Scan at 300+ DPI or take a well-lit photo of the photograph.

### Step 2: Enhance with AI
Upload to PicBoost and use the Enhance mode. The AI will automatically:
- Sharpen details
- Reduce noise
- Improve contrast
- Correct colors

### Step 3: Upscale if Needed
If the original is small, use the Upscale mode to increase resolution up to 4x.

### Step 4: Fine-Tune
Use the before/after comparison to check results. Re-process if needed.

## Tips for Best Results
- Use flat, even lighting when photographing old photos
- Clean the scanner bed before scanning
- Start with the highest resolution possible
- Save enhanced images in PNG format for best quality
  `,
  "social-media-image-sizes-2026": `
# Social Media Image Size Guide 2026 (All Platforms)

Getting image dimensions right is crucial for social media success. Here's your complete reference.

## Platform-Specific Requirements

### Instagram
- **Profile photo**: 320x320px
- **Feed post**: 1080x1080px (square), 1080x1350px (portrait)
- **Story/Reel**: 1080x1920px
- **Carousel**: 1080x1080px or 1080x1350px

### Facebook
- **Profile photo**: 170x170px
- **Cover photo**: 820x312px
- **Feed post**: 1200x630px
- **Story**: 1080x1920px

### Twitter/X
- **Profile photo**: 400x400px
- **Header**: 1500x500px
- **Feed image**: 1600x900px

### LinkedIn
- **Profile photo**: 400x400px
- **Cover photo**: 1584x396px
- **Post image**: 1200x627px

### TikTok
- **Profile photo**: 200x200px
- **Video**: 1080x1920px

## How to Use These Sizes with PicBoost

1. Upload your original image
2. Use Upscale mode to reach the target resolution
3. Crop to the exact dimensions using any image editor
4. Post with confidence!

## Common Mistakes to Avoid
- Using low-resolution images that look pixelated
- Ignoring aspect ratio requirements
- Not testing how images appear on mobile
  `,
  "what-is-ai-super-resolution": `
# What is AI Super Resolution? Explained Simply

AI super resolution is the technology that lets you create high-resolution images from low-resolution originals. But how does it actually work?

## The Basic Concept

Traditional upscaling simply stretches pixels, making images blurry. AI super resolution uses deep learning to **intelligently add new pixels** based on what the AI has learned from millions of images.

## How It Works

1. **Training**: The AI model studies millions of high-quality images
2. **Pattern recognition**: It learns what details should exist at different scales
3. **Reconstruction**: When given a low-res image, it predicts and generates the missing details

## Real-ESRGAN: The Engine Behind PicBoost

PicBoost uses Real-ESRGAN, one of the most advanced open-source super resolution models:
- **25,000+ stars** on GitHub
- Trained on diverse image types
- Handles real-world degradation patterns
- Supports 2x and 4x upscaling

## Use Cases

- **Old photo restoration**: Bring vintage photos to modern resolution
- **E-commerce**: Create high-quality product images from phone photos
- **Printing**: Upscale images for large format printing
- **Social media**: Make any image Instagram-ready

## Try It Yourself

Upload any image to PicBoost and experience AI super resolution firsthand. It's free, no sign-up required.
  `,
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { lang, t } = useLang()
  const prefix = lang === "zh" ? "/zh" : ""
  const bp = t.blogPost
  const postMeta = t.blog.posts.find((p) => p.slug === params.slug)

  if (!postMeta) notFound()

  const content = lang === "zh" ? undefined : BLOG_CONTENT[params.slug]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-16 px-4">
        <article className="container mx-auto max-w-3xl">
          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link href={`${prefix}/blog`} className="hover:text-foreground">{bp.backToBlog}</Link>
              <span>/</span>
              <span>{postMeta.date}</span>
              <span>•</span>
              <span>{postMeta.readTime} {t.blog.readTime}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{postMeta.title}</h1>
            <p className="text-lg text-muted-foreground">{postMeta.excerpt}</p>
          </header>

          {content && (
            <div className="prose prose-lg max-w-none">
              {content.split("\n").map((line, i) => {
                const trimmed = line.trim()
                if (!trimmed) return null
                if (trimmed.startsWith("# ")) return <h1 key={i} className="text-3xl font-bold mt-8 mb-4">{trimmed.replace("# ", "")}</h1>
                if (trimmed.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold mt-6 mb-3">{trimmed.replace("## ", "")}</h2>
                if (trimmed.startsWith("### ")) return <h3 key={i} className="text-xl font-semibold mt-4 mb-2">{trimmed.replace("### ", "")}</h3>
                if (trimmed.startsWith("- **")) return <li key={i} className="ml-4 mb-1" dangerouslySetInnerHTML={{ __html: trimmed.replace(/^- /, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                if (trimmed.startsWith("- ")) return <li key={i} className="ml-4 mb-1 text-muted-foreground">{trimmed.replace("- ", "")}</li>
                if (trimmed.startsWith("|")) return <p key={i} className="text-sm font-mono bg-muted/50 px-3 py-1 rounded">{trimmed}</p>
                if (/^\d+\./.test(trimmed)) return <li key={i} className="ml-4 mb-1 text-muted-foreground">{trimmed.replace(/^\d+\.\s*/, "")}</li>
                return <p key={i} className="mb-4 text-muted-foreground leading-relaxed">{trimmed}</p>
              })}
            </div>
          )}

          <div className="mt-12 p-6 bg-muted rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-2">{bp.ctaTitle}</h3>
            <p className="text-muted-foreground mb-4">{bp.ctaDesc}</p>
            <Link href={`${prefix}/enhance`}>
              <Button size="lg">{bp.ctaButton}</Button>
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
