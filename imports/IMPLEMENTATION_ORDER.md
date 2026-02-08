# 🚀 IMPLEMENTATION ORDER - Start Here

## ✅ IMMEDIATE (Do First - 30 minutes)

These fix your current issues:

1. **Thumbnail Fix**
   - File: `components/thumbnail.tsx`
   - Issue: Shows "alt" instead of image
   - Add: `unoptimized` prop to Image component

2. **Sidebar Live First**
   - File: `lib/recommended-service.ts`
   - Add: `orderBy: [{ stream: { isLive: "desc" } }]`

3. **Dynamic Carousel**
   - Files: 
     - `app/(browse)/(home)/_components/featured-carousel-wrapper.tsx` (new)
     - `app/(browse)/(home)/_components/featured-carousel.tsx` (update)
   - Features: DB-based, 7s transitions, 5 streams (live prioritized)

4. **Update Homepage**
   - File: `app/(browse)/(home)/page.tsx`
   - Import new carousel wrapper

---

## 📦 PRIORITY 1: Foundation (2-3 hours)

### Step 1: Database (30 min)
```bash
# 1. Update schema
cp schema-with-categories.prisma prisma/schema.prisma

# 2. Push to DB
npx prisma db push

# 3. Generate client
npx prisma generate

# 4. Seed database
cp seed-with-categories-tags.ts prisma/seed.ts
npm run seed
```

### Step 2: Services (30 min)
- Create `lib/category-service.ts`
- Create `lib/tag-service.ts`
- Update `actions/stream.ts` with category/tag actions

### Step 3: UI Components (1 hour)
- Create `components/category-selector.tsx`
- Create `components/tag-input.tsx`
- Create `components/ui/badge.tsx` (if not exists)
- Update `app/(dashboard)/u/[username]/(home)/_components/stream-info-card.tsx`

### Step 4: Search & Filters (1 hour)
- Update `lib/search-service.ts`
- Update `app/search/page.tsx`
- Create `app/search/_components/search-filters.tsx`
- Update result cards with viewer count

**Test**: Categories, tags, search filters all working

---

## 🎯 PRIORITY 2: Engagement (3-4 hours)

### Clips System (2 hours)
1. Add Clip model to schema
2. Create `lib/clip-service.ts`
3. Create `actions/clip.ts`
4. Build clip capture UI
5. Test clip creation

### Notifications (1 hour)
1. Add Notification model
2. Create `lib/notification-service.ts`
3. Create `components/notification-bell.tsx`
4. Add to navbar

### Chat Emotes (1 hour)
1. Add Emote model
2. Create `components/emote-picker.tsx`
3. Integrate with chat

**Test**: Create clips, receive notifications, use emotes

---

## 📊 PRIORITY 3: Streamer Tools (2-3 hours)

### Analytics (2 hours)
1. Add ViewerHistory, FollowerHistory models
2. Create `lib/analytics-service.ts`
3. Create analytics page
4. Build charts (use recharts)

### Stream Schedule (1 hour)
1. Add Schedule model
2. Create schedule editor
3. Display on profile

### Raid System (Optional - 1 hour)
1. Add raid action
2. Create raid UI
3. LiveKit room switching

**Test**: View analytics, set schedule

---

## 💰 PRIORITY 4: Monetization (Advanced - 4+ hours)

Only do this when core features are stable!

### Stripe Integration
1. Add subscription models
2. Set up Stripe account
3. Create subscription tiers
4. Build tip system
5. Handle webhooks

### Channel Points
1. Add points models
2. Auto-reward system
3. Custom rewards
4. Redemption UI

**Test**: Process payments (use Stripe test mode)

---

## 🎨 PRIORITY 5: Polish (1-2 hours)

### Theater Mode
- Add to video player
- Toggle UI layout

### Chat Moderation
- Timeout system
- Ban management
- Mod panel

### VOD System
- Recording storage
- Playback page
- VOD management

---

## 📋 TESTING CHECKLIST

After each priority, test:

**Priority 1**:
- [ ] Categories show in dropdown
- [ ] Can create custom categories
- [ ] Tags save and display
- [ ] Search filters work
- [ ] Viewer count displays
- [ ] Carousel auto-rotates
- [ ] Live streams show first in sidebar

**Priority 2**:
- [ ] Can create clips
- [ ] Notifications appear
- [ ] Emotes display in chat

**Priority 3**:
- [ ] Analytics charts load
- [ ] Schedule saves
- [ ] Can initiate raids

**Priority 4**:
- [ ] Subscriptions process
- [ ] Tips work
- [ ] Points accumulate

**Priority 5**:
- [ ] Theater mode toggles
- [ ] Timeouts apply
- [ ] VODs play

---

## 🆘 TROUBLESHOOTING

**Prisma errors**: Run `npx prisma generate` after schema changes

**TypeScript errors**: Check imports match new file locations

**404 on images**: Add domain to `next.config.ts` images.remotePatterns

**Seed fails**: Clear data first:
```typescript
await prisma.streamTag.deleteMany({});
await prisma.follow.deleteMany({});
await prisma.stream.deleteMany({});
await prisma.user.deleteMany({});
await prisma.tag.deleteMany({});
await prisma.category.deleteMany({});
```

**Build errors**: Delete `.next` folder and rebuild

---

## 🎯 RECOMMENDED APPROACH

**Week 1** (Immediate + Priority 1):
- Day 1: Immediate fixes (carousel, thumbnail, sidebar)
- Day 2-3: Database setup, categories, tags
- Day 4-5: Search filters, viewer count

**Week 2** (Priority 2):
- Day 1-2: Clips system
- Day 3: Notifications
- Day 4: Emotes

**Week 3** (Priority 3):
- Day 1-2: Analytics
- Day 3: Schedule
- Day 4-5: Polish and testing

**Later** (Priority 4 & 5):
- Monetization when ready for production
- VOD system when have storage solution

---

## 📝 NOTES

- **Don't skip testing**: Test after each feature
- **Commit often**: Git commit after each working feature
- **One file at a time**: Don't try to implement everything at once
- **Use the package**: All code is in COMPLETE_IMPLEMENTATION_PACKAGE.md
- **Ask questions**: If stuck, review the documentation or schemas

**Ready to start? Begin with IMMEDIATE fixes!**

