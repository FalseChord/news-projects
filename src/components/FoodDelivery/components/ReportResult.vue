<template>
  <section class="report-result">
    <UserState ref="userState" />
    <div class="report-result__reward">
      <div>
        <p class="report-result__num" ref="orderCount">{{ orderCount }}</p>
        <p class="report-result__name">已配送</p>
      </div>
      <div>
        <p class="report-result__num" ref="money">{{ money }}</p>
        <p class="report-result__name">金額</p>
      </div>
      <div>
        <p class="report-result__num" ref="readTime">{{ time }}</p>
        <p class="report-result__name">時間</p>
      </div>
    </div>
    
    <div class="report-result__cheers">
      <!-- <svg enable-background="new 0 0 393.4 432.3" viewBox="0 0 393.4 432.3" xmlns="http://www.w3.org/2000/svg">/ -->
      <svg enable-background="new -94.42 0 582.23 462.56" viewBox="-94.42 0 582.23 462.56" xmlns="http://www.w3.org/2000/svg">
        <g fill="#999">
          <path ref="glassL"
            d="m7.6 374.7 105.3 30.2c5.6 1.6 11.4-1.6 13-7.2 1.6-5.6-1.6-11.4-7.2-13l-43.1-12.4 16.9-61c41.3 5.8 81.8-20.1 93-61.3l24.5-90.3c2-7.3-2.4-15-9.7-17l-137.9-37.4c-7.3-2-15 2.4-17 9.7l-24.4 90.3c-11.4 42 11.3 85.5 51.1 100.7l-16.7 60.5-42-12c-5.6-1.6-11.4 1.6-13 7.2-1.6 5.6 1.7 11.4 7.2 13zm166.9-172.2-122.5-14.6c-1.7-.2-2.9-1.9-2.4-3.6l14.7-54.3c.5-1.7 2.2-2.7 3.9-2.2l117.3 31.8c1.7.5 2.7 2.2 2.2 3.9l-10 37c-.4 1.3-1.8 2.2-3.2 2zm-86.3 84.6-.6-.2c-33.8-9.2-53.9-44.3-44.7-78 .1-.4.4-.6.8-.5l126.8 15.1c.5.1.8.5.6.9l-4.9 18c-9.1 33.7-44.2 53.8-78 44.7z" />
          <path ref="glassR"
            d="m393 388.7c-1.6-5.6-7.4-8.8-13-7.2l-42 12-16.7-60.5c39.8-15.2 62.5-58.8 51.2-100.7l-24.6-90.3c-2-7.3-9.6-11.7-17-9.7l-137.8 37.4c-7.3 2-11.7 9.6-9.7 17l24.6 90.3c11.2 41.3 51.7 67.1 93 61.3l16.9 61-43.1 12.4c-5.6 1.6-8.8 7.4-7.2 13 1.6 5.6 7.4 8.8 13 7.2l105.3-30.2c5.5-1.6 8.7-7.4 7.1-13zm-177.2-161.3-10-37c-.5-1.7.5-3.4 2.2-3.9l117.3-31.8c1.7-.5 3.4.5 3.9 2.2l14.8 54.3c.5 1.7-.7 3.4-2.4 3.6l-122.5 14.6c-1.6.3-2.9-.6-3.3-2zm11.4 42-4.9-18c-.1-.4.2-.9.6-.9l126.8-15.1c.4 0 .7.2.8.5 9.2 33.8-11 68.9-44.7 78l-.6.2c-33.7 9.1-68.9-11-78-44.7z" />
          <path ref="clangC"
            d="m242.8 12.3-12.5 49.9c-1.3 5.2-6.6 8.4-11.8 7.1l-.5-.1c-5.2-1.3-8.4-6.6-7.1-11.8l12.5-49.9c1.3-5.2 6.6-8.4 11.8-7.1l.5.1c5.2 1.2 8.4 6.5 7.1 11.8z" />
          <path ref="clangL"
            d="m146.2 16 29.6 42.1c3.1 4.4 2 10.5-2.4 13.6l-.4.3c-4.4 3.1-10.5 2-13.6-2.4l-29.6-42.1c-3.1-4.4-2-10.5 2.4-13.6l.4-.3c4.4-3.1 10.5-2 13.6 2.4z" />
          <path ref="clangR"
            d="m315.4 71.8-46.5 22.1c-4.9 2.3-10.7.2-13-4.6l-.2-.4c-2.3-4.9-.2-10.7 4.6-13l46.5-22.1c4.9-2.3 10.7-.2 13 4.6l.2.4c2.3 4.8.2 10.7-4.6 13z" />
        </g>
      </svg>
    </div>
    <div class="report-result__action">
      <button type="button" class="order" @click="handleAction(result.id)">{{ result.action }}</button>
      
      <div class="share" @click.once="showShareIcon(result.id)" :class="{ 'can-share': isShare }">
        <div class="share__text">分享成就（報導）</div>
        <a :href="`https://www.facebook.com/share.php?u=${shareLink(result.id)}`" target="_blank" class="share__item fb"></a>
        <a :href="`https://line.me/R/msg/text/?${shareLink(result.id)}`" target="_blank" class="share__item line"></a>
        <span class="share__item copylink" @click="copyLinkToClipboard(shareLink(result.id))"></span>
      </div>
    </div>
  </section>
</template>

<script>
import { READR_SITE_URL } from 'src/constants'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('FoodDelivery')

import UserState from './UserState.vue'

export default {
  name: 'ReportResult',
  props: [ 'result' ],
  components: {
    UserState
  },
  data () {
    return {
      orderCount: 0,
      money: 0,
      seconds: 0,
      state: '前往目的地的路上',
      isShare: false
    }
  },
  mounted () {
    this.$refs.userState.typing()
  },
  computed: {
    ...mapState([
      'userState',
      'readReportIds',
      'currentReadReportId',
      'isBaseReport'
    ]),
    time () {
      // const { minutes, seconds } = this.times
      // return {
      //   minutes: minutes >= 10 ? minutes : `0${minutes}`,
      //   seconds: seconds >= 10 ? seconds : `0${seconds}`
      // }
      const minutes = Math.floor(this.seconds / 60)
      const seconds = (this.seconds % 60)
      // return `${minutes.toString().length === 2 ? minutes : `0${minutes}`}:${seconds.toString().length === 2 ? seconds : `0${seconds}`}`
      return `${minutes >= 10 ? minutes : `0${minutes}`}:${seconds >= 10 ? seconds : `0${seconds}`}`
      // return { minutes, seconds }
    }
  },
  methods: {
    ...mapMutations([
      'copyLinkToClipboard'
    ]),
    ...mapActions([
      'scrollToOrder'
    ]),
    handleAction (id) {
      this.scrollToOrder({ id: (id + 1) <= 5 ? (id + 1) : 1 })
      
      let gaLabel = ''
      switch (id) {
        case 1:
          gaLabel = '如何成為外送員'
          break
        case 2:
          gaLabel = '美食外送平台解決了什麼問題'
          break
        case 3:
          gaLabel = '司機管理仰賴檢舉和評價'
          break
        case 4:
          gaLabel = '外送員最害怕的事：車禍'
          break
        case 5:
          gaLabel = '平台經濟帶來的好與壞'
          break
        default:
          break
      }
      window.ga('send', 'event', 'projects', 'click', `${gaLabel}-繼續閱讀`)
    },
    showShareIcon (id) {
      this.isShare = true
      let gaLabel = ''
      switch (id) {
        case 1:
          gaLabel = '如何成為外送員'
          break
        case 2:
          gaLabel = '美食外送平台解決了什麼問題'
          break
        case 3:
          gaLabel = '司機管理仰賴檢舉和評價'
          break
        case 4:
          gaLabel = '外送員最害怕的事：車禍'
          break
        case 5:
          gaLabel = '平台經濟帶來的好與壞'
          break
        default:
          break
      }
      window.ga('send', 'event', 'projects', 'click', `${gaLabel}-分享`)
    },
    shareLink (id) {
      return `${READR_SITE_URL}food-delivery/order${id}`
    },
    cheers () {
      const { glassL, glassR, clangL, clangC, clangR } = this.$refs
      const tl = gsap.timeline({ repeat: -1 })
      tl.set([ glassL, glassR ], { transformOrigin: '50% 70%' })
      tl.to([ clangR, clangC, clangL ], { duration: 0.8, scale: 0, transformOrigin: '50% 100%', ease: 'expo.in' }, 0.4)
      tl.to(glassL, { duration: 1.2, rotation: '-=40', x: '-=10', scale: 0.88, ease: 'power1.in' }, 0.4)
      tl.to(glassR, { duration: 1.2, rotation: '+=40', x: '+=10', scale: 0.88, ease: 'power1.in' }, 0.4)
      tl.to(glassL, { duration: 0.8, rotation: '+=40', x: '+=10', scale: 1,    ease: 'back.out(1.7)' }, '>')
      tl.to(glassR, { duration: 0.8, rotation: '-=40', x: '-=10', scale: 1,    ease: 'back.out(1.7)' }, '<')
      tl.to([ clangL, clangC, clangR ], { duration: 0.25, scale: 1, transformOrigin: '50% 100%', ease: 'elastic.out(1, 0.4)' }, '<0.25')
      return tl
    },
    changeOrderCount () {
      const tl = gsap.timeline()
      const { orderCount } = this.$refs
      
      tl.to(orderCount, {
        scale: 1.5,
        duration: 0.5,
        ease: 'expo.in',
      }, 0)
      tl.to(orderCount, {
        scale: 1,
        duration: 0.5,
        ease: 'circ.out'
      }, 0.5)
      tl.to(this, {
        orderCount: this.result.orderCount,
        duration: 1,
        // duration: 2,
        snap: { orderCount: 1 },
        ease: 'circ.out'
      }, 0.25)
      return tl
    },
    changeMoney () {
      const tl = gsap.timeline()
      const { money } = this.$refs

      tl.to(money, {
        scale: 1.5,
        duration: 0.5,
        ease: 'expo.in',
      }, 0)
      tl.to(money, {
        scale: 1,
        duration: 0.5,
        ease: 'circ.out'
      }, 0.5)
      tl.to(this, {
        money: this.result.money,
        duration: 1.5,
        snap: { money: 1 },
        ease: 'circ.out'
      }, 0.25)
      return tl
    },
    changeTime () {
      const tl = gsap.timeline()
      const { readTime } = this.$refs
      
      tl.to(readTime, {
        scale: 1.5,
        duration: 0.5,
        ease: 'expo.in',
      }, 0)
      tl.to(readTime, {
        scale: 1,
        duration: 0.5,
        ease: 'circ.out'
      }, 0.5)
      tl.to(this, {
        seconds: this.result.seconds,
        duration: 1.5,
        snap: { minutes: 1, seconds: 1 },
        ease: 'circ.out'
      }, 0.25)
      return tl
    }
  },
  watch: {
    readReportIds () {
      if (this.currentReadReportId !== this.result.id) {
        this.$refs.userState.typingBack()
        this.orderCount = this.result.orderCount
        this.money = this.result.money
        this.seconds = this.result.seconds
        return
      }

      const readReportCount = this.readReportIds.length
      const ResultTl = gsap.timeline()
      
      ResultTl.add(this.$refs.userState.typingBack(), 0)
      if (readReportCount === 3 || readReportCount === 5) {
        ResultTl.add(this.changeOrderCount(), 0.75)
        ResultTl.add(this.changeMoney(), 0.75)
      }
      ResultTl.add(this.changeTime(), 0.75)
      ResultTl.add(this.cheers(), '>-1')
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.report-result
  background-color rgba(#000, 0.3)
  height 100vh
  @media (min-width $mobile)
    height auto
    // (120 - 70) / 2
    padding-bottom 100px
  &__cheers
    // width 82px
    width 121.36px
    margin-left auto
    margin-right auto
    margin-top 20px
    margin-bottom 20px
  &__reward
    color #fff
    display flex
    text-align center
    justify-content space-between
    line-height normal
    max-width 240px
    margin-left auto
    margin-right auto
    margin-top 13px
  &__num
    color #ffdc03
    font-size 1.8rem
    line-height 1.4
  &__name
    font-size 1.4rem
  &__action
    margin-right auto
    margin-left auto
    padding-right 40px
    padding-left 40px
    max-width 600px
    @media (min-width 680px)
      padding-right 0
      padding-left 0
    & button, & .share
      font-weight 500
      color #4a4a4a
      font-size 1.8rem
      border-radius 20px
      height 40px
      text-align center
      line-height 40px
      width 100%
      &:active
        color #000
        background-color #ffec78
      @media (min-width $mobile)
        border-radius 10px
    & .order
      background-color #ffdc03
      margin-bottom 16px
      padding 0
    & .share
      background-color #ffdc03
      overflow hidden
      position relative
      display flex
      align-items center
      justify-content center
      z-index 20
      &.can-share
        & .share__item
          opacity 1
          transform translateY(0)
        & .share__text
          transform translateY(-100%)
      &__text
        background-color #fff
        transition transform 0.6s $easeInOutCubic
        border-radius 20px
        position absolute
        width 100%
        cursor pointer
        z-index 19
        &:active
          background-color #c4c4c4
        @media (min-width $mobile)
          border-radius 10px
      &__item
        width 30px
        height 30px
        background-size 30px
        background-position center
        background-repeat no-repeat
        transform translateY(100%)
        opacity 0
        transition all 0.3s $easeOutCubic
        cursor pointer
        & + .share__item
          margin-left 20px
        &.fb
          background-image url(/proj-assets/food-delivery/img/icon/share-fb-gray.svg)
          transition-delay 0.5s
        &.line
          background-image url(/proj-assets/food-delivery/img/icon/share-line-gray.svg)
          transition-delay 0.3s
        &.copylink
          background-image url(/proj-assets/food-delivery/img/icon/share-copylink-gray.svg)
          transition-delay 0.1s
</style>