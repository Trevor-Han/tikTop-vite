<template>
  <div class="comment_box">
    <div class="comment_top">
      12.5w条评论
    </div>
    <ul class="comment_ul">
      <li v-if="state.videoComment">
        <transition-group appear>
          <div
            v-for="(item,index) in state.videoComment"
            :key="index"
            class="comment_li"
            @click="replayUser(item,index,-1)"
          >
            <div class="comment_author_left">
              <img
                :src="item.avatar"
                alt="avatar"
              >
            </div>
            <div class="comment_author_right">
              <div class="comment_author_top">
                <div class="comment_author_name">@{{ item.nickname }}</div>
                <div
                  class="icon-shoucang1_box"
                  @click.stop="commentLove(item,index,-1)"
                >
                  <div
                    class="icon_right_change"
                    :class="item.love_comment?'love_active':''"
                  >
                    <van-icon
                      name="like"
                      class="icon-shoucang1"
                    />
                  </div>
                  <div class="shoucang1_num">{{ item.love_count }}</div>
                </div>
              </div>
              <div class="comment_author_text">
                {{ item.comment_content }}<span>{{ item.create_time }}</span></div>
            </div>
            <div class="clear" />
            <div class="comment_replay_box">
              <transition-group appear>
                <div
                  v-for="(item2,index2) in item.child_comment"
                  :key="index2"
                  class="comment_replay_li"
                  @click.stop="replayUser(item2,index,index2)"
                >
                  <div class="comment_replay_left">
                    <img
                      :src="item2.avatar"
                      alt="avatar"
                    >
                  </div>
                  <div class="comment_replay_right">
                    <div class="comment_replay_top">
                      <div class="comment_replay_name">@{{ item2.nickname }}</div>
                      <div
                        class="icon-shoucang1_box"
                        @click.stop="commentLove(item2,index,index2)"
                      >
                        <div
                          class="icon_right_change"
                          :class="item2.love_comment?'love_active':''"
                        >
                          <van-icon
                            name="like"
                            class=" icon-shoucang1"
                          />
                        </div>
                        <div class="shoucang1_num">{{ item2.love_count }}</div>
                      </div>
                    </div>
                    <div class="comment_replay_text">
                      <span v-if="item.user_id !== item2.be_commented_user_id && item.user_id !== item2.user_id">回复 {{ item2.be_commented_nickname }}：</span>
                      {{ item2.comment_content }}
                      <span>{{ item2.create_time }}</span></div>
                  </div>
                  <div class="clear" />
                </div>
              </transition-group>
            </div>
          </div>
        </transition-group>
      </li>
      <li
        v-if="state.videoComment.length === 0"
        class="no_message"
      >
        <i class="iconfont iconfont_style icon-zanwupinglun" />
        <div class="no_message_tips">暂无评论</div>
      </li>
    </ul>
  </div>
  <!--留言输入-->
  <div class="comment_input_box">
    <input
      ref="content"
      v-model="state.comment_text"
      :placeholder="state.commentPlaceholder"
      class="comment_input"
      @keyup.enter="checkComment"
    >
    <!--</form>-->
    <div
      class="comment_input_right"
      @click="checkComment"
    >
      <van-icon
        name="smile-comment-o"
        class="comment_i"
        :class="state.canSend?'comment_i_active':''"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { commentList } from '../../api/api'
import { Toast } from 'vant'

const props = defineProps({
  commentPop: false
})

const content = ref(null)
const state = reactive({
  videoComment: [], // 评论所有数据
  commentPlaceholder: '留下你精彩的评论吧', // 评论Placeholder
  comment_text: '', // 评论输入内容
  canSend: false, // 是否可以发送
  replayUserData: '', // 回复评论数据
  to_comment_id: ''
})
watch(props, val => {
  if (!val.commentPop) {
    state.replayUserData = ''
    state.commentPlaceholder = '留下你精彩的评论吧'
  }
})
onMounted(() => {
  commentList().then(item => {
    state.videoComment = item.data.comment
  })
})
// 点击回复
function replayUser(item, index, index2) {
  if (item.p_id === 'N_1') {
    state.commentPlaceholder = '留下你精彩的评论吧'
    state.replayUserData = ''
    content.value.focus()
  } else {
    item.index = index
    item.index2 = index2
    state.replayUserData = item
    state.commentPlaceholder = `回复 @${item.nickname}：`
    content.value.focus()
  }
}
// 评论点赞
function commentLove(item, index, index2) {
  const love_comment = item.love_comment
  let love_flag = 0// 0:取消点赞；1：点赞
  if (love_comment) {
    // 取消点赞
    love_flag = 0
  } else {
    // 添加点赞
    love_flag = 1
  }
  // setTimeout模拟Ajax请求
  setTimeout(() => {
    if (index2 === -1) {
      // 点赞一级评论
      state.videoComment[index].love_comment = !state.videoComment[index].love_comment
      if (love_flag === 1) {
        state.videoComment[index].love_count++
      } else {
        state.videoComment[index].love_count--
      }
    } else {
      // 点赞二级评论
      state.videoComment[index].child_comment[index2].love_comment = !state.videoComment[index].child_comment[index2].love_comment
      if (love_flag === 1) {
        state.videoComment[index].child_comment[index2].love_count++
      } else {
        state.videoComment[index].child_comment[index2].love_count--
      }
    }
  }, 500)
}
// 检测评论内容
function checkComment() {
  if (state.comment_text === '') {
    Toast.fail('评论内容不能为空')
  } else {
    let comment_id = 0; let p_id = 'N_1'; let p_user_id = ''; const content = state.comment_text
    if (state.replayUserData !== '') {
      comment_id = state.replayUserData.comment_id
      p_id = state.replayUserData.p_id
      p_user_id = state.replayUserData.user_id
    }
    sendComment(comment_id, p_id, p_user_id, content)
  }
}

/**
   * 发送评论
   * @param comment_id 记录id
   * @param p_id 评论id
   * @param p_user_id 评论人id
   * @param content 评论内容
   */
function sendComment(comment_id, p_id, p_user_id, content) {
  state.comment_text = ''
  setTimeout(() => {
    const newData = {
      'comment_id': comment_id,
      'p_id': p_id,
      'comment_content': content,
      'love_count': 0,
      'create_time': '刚刚',
      'user_id': p_user_id,
      'nickname': '游客', // 当前用户
      'avatar': 'https://profile.csdnimg.cn/B/7/A/2_weixin_45785873',
      'be_commented_user_id': '',
      'be_commented_nickname': ''
    }
    if (state.replayUserData === '') {
      // 回复作品
      state.videoComment.splice(0, 0, newData)
    } else {
      const index = state.replayUserData.index
      const index2 = state.replayUserData.index2
      if (state.replayUserData.index2 === -1) {
        // 回复一级人
        state.videoComment[index].child_comment.splice(0, 0, newData)
      } else {
        // 回复二级人
        state.videoComment[index].child_comment.splice(index2, 0, newData)
      }
    }
    state.replayUserData = ''
    state.commentPlaceholder = '留下你精彩的评论吧'
  }, 500)
}
</script>

<style scoped>
  .love_active {
    color: #f44;
  }

  .comment_box {
    padding: 0 15px 52px 15px;
  }

  .comment_top {
    text-align: center;
    font-size: 12px;
    color: #000;
    line-height: 40px;
  }

  .guanbi3 {
    float: right;
    font-size: 12px;
    padding: 0 10px;
    position: absolute;
    right: 6px;
  }

  .comment_li {
    margin-bottom: 20px;
    font-size: 14px;
    text-align: left;
  }

  .comment_author_left {
    float: left;
  }

  .comment_author_left img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  .comment_author_right {
    margin-left: 46px;
    padding-top: 4px;
  }

  .comment_author_top {
    position: relative;
  }

  .comment_author_name {
    margin-bottom: 6px;
    color: #777;
  }

  .icon-shoucang1_box {
    position: absolute;
    right: 0;
    top: 0;
    text-align: center;
    color: #777;
  }

  .comment_author_text {
    color: #555;
    margin-bottom: 10px;
    padding-right: 35px;
  }

  .comment_replay_box {
    padding-left: 46px;
    box-sizing: border-box;
  }

  .comment_replay_li {
    margin-bottom: 10px;
  }

  .comment_replay_left {
    float: left;
  }

  .comment_replay_left img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  .comment_replay_right {
    margin-left: 35px;
    padding-top: 2px;
  }

  .comment_replay_top {
    position: relative;
    margin-bottom: 6px;
  }

  .comment_replay_text {
    padding-right: 35px;
    margin-bottom: 10px;
    color: #555;
  }

  .comment_author_text span, .comment_replay_text span {
    color: #999;
    font-size: 13px;
    margin-left: 6px;
  }

  .shoucang1_num {
    text-align: center;
    width: 30px;
    font-size: 12px;
    /* right: -4px; */
    position: relative;
  }

  .comment_ul {
    height: 400px;
    overflow-y: auto;
  }

  /*************留言*********/
  .comment_container {
    width: 100%;
    border-top-left-radius: 10px!important;
    border-top-right-radius: 10px!important;
  }
  .comment_input_box {
    position: fixed;
    bottom: 0;
    z-index: 2999;
    width: 100%;
    border-top: 1px solid #e8e8e8;
    background: #fff;
    padding: 10px 15px;
    box-sizing: border-box;
    font-size: 15px;
    color: #999;
  }

  /*.comment_form {*/
  /**/
  /*}*/

  .comment_input {
    border: none;
    resize: none;
    width: 80%;
    float: left;
    color: #555;
    caret-color: #f44;
  }

  .comment_input_right {
    float: right;
  }

  .comment_i {
    font-size: 22px;
    color: #999;
    transition: .3s;
  }

  .comment_i_active {
    color: #f44;
  }
  /*************************************/
</style>
