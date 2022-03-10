<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar"
                 title="登录" />

    <!-- 登录表单 -->
    <van-form ref="loginForm"
              @submit="onSubmit">
      <van-cell-group class="input-warp"
                      inset>
        <van-field v-model="user.mobile"
                   name="mobile"
                   placeholder="请输入手机号"
                   :rules="userFormRules.mobile"
                   type="number"
                   maxlength="11">
          <i slot="left-icon"
             class="iconfont icon-shouji"></i>
        </van-field>
        <van-field class="smsInput"
                   v-model="user.code"
                   name="code"
                   placeholder="请输入验证码"
                   :rules="userFormRules.code"
                   type="number"
                   maxlength="6">
          <i slot="left-icon"
             class="iconfont icon-yanzhengma"></i>
          <template #button>
            <!-- 倒计时 -->
            <van-count-down v-if="isCountDownShow"
                            class="time"
                            :time="1000 * 60"
                            format="ss s"
                            @finish="isCountDownShow = false" />
            <van-button v-else
                        class="send-msm-btn"
                        round
                        size="small"
                        type="primary"
                        @click="onSendSms"
                        native-type="button">发送验证码</van-button>
          </template>
        </van-field>
      </van-cell-group>
      <div class="login-btn-warp">
        <van-button class="login-btn"
                    block
                    type="primary"
                    native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        },
        {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        },
        {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false // 是否显示时间
    }
  },
  methods: {
    async onSubmit () {
      // 1. 获取表单数据
      const user = this.user
      // 2. 表单验证
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认2000，如果为0，则持续展示
      })

      // 3. 提交表单请求登录
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
      } catch (error) {
        if (error.response.status === 400) {
          // console.log('手机号或验证码错误')
          this.$toast.fail('手机号或验证码错误')
        } else {
          // console.log('登录失败', error)
          this.$toast.fail('登录失败')
        }
      }
    },

    async onSendSms () {
      // 1. 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
        console.log('验证通过')
      } catch (error) {
        return console.log('验证失败', error)
      }
      // 2. 验证通过,显示倒计时
      this.isCountDownShow = true

      // 3. 请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (error) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (error.response.status === 429) {
          this.$toast('发送太频繁了，请稍后再试')
        } else {
          this.$toast('发送失败')
        }
      }
    }
  }
}
</script>

<style lang="less">
.login-container {
  .input-warp {
    width: 100%;
    margin-left: 0px;
  }
  .iconfont {
    font-size: 37px;
  }

  .send-msm-btn {
    width: 152px;
    height: 46px;
    background-color: #ededed;
    line-height: 46px;
    border: none;
    font-size: 22px;
    color: #666;
  }
  .time {
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    margin-top: 11px;
  }

  .login-btn-warp {
    padding: 53px 33px;

    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
