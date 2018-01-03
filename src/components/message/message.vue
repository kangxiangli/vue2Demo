<style type="text/css">
	  #cav1,#cav2{
            border: 1px solid red;
            z-index: 99;
            position: absolute;
        }
        #guaJiang .bjc {  
            color: black;  
            height: 70px;  
            width: 240px;  
            text-align: center;  
            line-height: 70px;  
            font-size: 20px;  
            position: absolute;  
            top: 300px;  
            left: 60px;  
            /*background-image: url(img/4-01.png);*/  
            background-repeat: no-repeat;  
            background-size: 18px 18px;  
            background-position: 80% 53%  
        }  
        #guaJiang .guaCanvas {  
            z-index: 3;  
            position: absolute;  
            top: 300px;  
            left: 60px  
        }  
</style>
<template>
  <!--判定ajax结束后，且有消息列表存在才开始渲染组件，防止报错-->
  <mu-list v-if="isAjax&&nowMessageList">
    <!--设置列表删除时动态效果-->
    <div v-for="(item, index) of nowMessageList"
         :class="[{swipeleft: isSwipe[index]},'wrap']"
         @click="getActiveId_x(item._id)"
         ref="child"
         :key="index">
      <mu-list-item :title="item.friend.name"
                    :describeLine="1"
                    :disableRipple="true"
                    class="list-item">
        <!--头像-->
        <mu-avatar :src="item.friend.avatar"
                   slot="leftAvatar" />
        <!--预览信息-->
        <span slot="describe">
            <span style="color: rgba(0, 0, 0, .5)" v-text="item.list[item.list.length-1].message"></span>
        </span>
        <!--时间与待处理-->
        <div class="item-right"
             slot="right">
          <!--获取到当前聊天队列，最后一条内容的time-->
          <span class="time" v-text="item.list[item.list.length-1].time"></span>
          <!--数据条数-数据需求是为字符串-->
          <mu-badge  circle :content="`${item.list.length}`" />
        </div>
      </mu-list-item>
      <!--滑动操作-->
      <div class="ms-item post-top" @click.stop="postItem(item._id)">置顶</div>
      <div class="ms-item sign-read" @click.stop="signItem(item._id)">标为已读</div>
      <div class="ms-item delete" @click.stop="removeItem(item._id)">删除</div>
    </div>
		  <template>
			<mu-card>
				 <div id='guaJiang'>  
            <div class='bjc'>萌赚送你1.5</div>  
            <canvas id="myCanvas" class='guaCanvas' width="240" height="70"></canvas>  
        </div> 
			</mu-card>
			</template>
  <mu-raised-button label="点击抽奖" @click="open" class="demo-raised-button"/>
   <mu-dialog :open="dialog" title="登录" @close="close">
   <template>
	<mu-paper>
  <mu-text-field hintText="用户名" class="demo-divider-form" :underlineShow="true" />
  <mu-divider/>
  <mu-text-field hintText="密码" class="demo-divider-form" :underlineShow="true" />
  <mu-divider/>
 
</mu-paper>
</template>
    <mu-flat-button slot="actions" @click="close" primary label="取消"/>
    <mu-flat-button slot="actions" primary @click="close" label="确定"/>
  </mu-dialog>
  </div>
  </mu-list>
  
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import imgtu from "../../../static/images/lazy.jpg"
export default {
  name: 'message',
  data() {
    return {
    	 dialog: false,
    	imgtu:imgtu,
      isSwipe: [false, false, false]
    }
  },
  computed: {
    ...mapGetters(['nowMessageList']),
    // ajax是否已经结束
    ...mapState(['isAjax'])
  },
  methods: {
    ...mapMutations(['showDialog', 'getActiveId', 'zeroRemove', 'removeMessage']),
    // 获取点击的friend的_id
    getActiveId_x(id) {
      this.getActiveId({ activeId: id })
      this.showDialog()
    },
    // 置顶
    postItem(_id) {
      console.log(2)
    },
    // 标为已读
    signItem(_id) {
      console.log(3)
    },
    // 删除信息
    removeItem(_id) {
      this.removeMessage({ _id })
    },
        open () {
      this.dialog = true
    },
    close () {
      this.dialog = false
    }
  },
  created() {
    setTimeout(() => {
      // 判断是否存在信息列表
      if (this.$refs.child) {
        this.$refs.child.forEach((element, index) => {
          let x, y, X, Y, swipeX, swipeY
          // 监听touchstart
          element.addEventListener('touchstart', e => {
            x = e.changedTouches[0].pageX
            y = e.changedTouches[0].pageY
            swipeX = true
            swipeY = true
            this.isSwipe = [false, false, false]
          })
          element.addEventListener('touchmove', e => {
            X = event.changedTouches[0].pageX
            Y = event.changedTouches[0].pageY
            if (swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0) {
              // 阻止默认事件
              e.stopPropagation()
              // 右滑
              if (X - x > 10) {
                e.preventDefault()
                this.isSwipe.splice(index, 1, false)
              }
              if (x - X > 10) {
                e.preventDefault()
                this.isSwipe.splice(index, 1, true)
              }
              swipeY = false
            }
            if (swipeY && Math.abs(X - x) - Math.abs(Y - y) < 0) {
              swipeX = false
            }
          })
        })
      }
    }, 1000)
  }
}
window.onload=function(){
	    var clientWidth = document.documentElement.clientWidth;  
                if(clientWidth *1 >0){  
                    document.querySelector("#guaJiang .bjc").style.left = (clientWidth - 240)/2 + "px";  
                    document.querySelector("#guaJiang .guaCanvas").style.left = (clientWidth - 240)/2 + "px";  
                }  
                  
                  
                 // 得到画笔  
                var cvs = document.getElementById("myCanvas"),  
                    ctx = cvs.getContext("2d"),  
                    touchRadius = 10;    // 默认手指触摸半径，可以自定义设置  
                  
                // 默认填充灰色来遮住文字  
                ctx.fillStyle = "#ccc";  
                ctx.fillRect(0, 0, 240, 70);    // fillRect，用矩形填充  
                ctx.font = '15px arial';  
                ctx.fillStyle = 'white';  
                ctx.fillText('您获得一次刮奖机会', 56,40);  
                  
                // 画园的方法  
                // @param { integer } 圆心的x坐标  
                // @param { integer } 圆心的y坐标  
                // @param { integer } 圆心半径  
                // @param { string } 填充的颜色（本例中会通过其余代码设置为‘透明’，所以这个设置可以忽略）  
                var fillCircle = function (x, y, radius, fillColor) {  
                    this.fillStyle = fillColor || "#eee";  
                    this.beginPath();  
                    this.moveTo(x-90, y-300);  
                    this.arc(x-90, y-300, radius, 0, Math.PI * 2, false);    // 标准画圆  
                    this.fill();  
                };  
                  
                // 得到涂抹的百分比  
                var getTransparentPercent = function (ctx, width, height) {  
                    var imgData = ctx.getImageData(0, 0, width, height),    // 得到canvas的像素信息  
                        pixles = imgData.data,  
                        transPixs = [];  
                    for (var i = 0, j = pixles.length; i < j; i += 4) {    // 因为存储的结构为[R, G, B, A]，所以要每次跳4个长度  
                        var a = pixles[i + 3];    // 拿到存储alpha通道的值  
                        if (a === 0) {    // alpha通道为0，就代表透明  
                            transPixs.push(i);  
                        }  
                    }  
                    return (transPixs.length / (pixles.length / 4) * 100).toFixed(2);  
                }  
                  
                // 需要判断是PC还是手机  
                var device = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()),  
                    clickEvtName = device ? 'touchstart' : 'mousedown',  
                    moveEvtName = device ? 'touchmove' : 'mousemove';  
                  
                // 判断是不是开始触摸等  
                if (!device) {  
                    var isMouseDown = false;  
                    document.addEventListener('mouseup', function (e) {  
                        isMouseDown = false;  
                    }, false);  
                } else {  
                    document.addEventListener("touchmove", function (e) {  
                        if (isMouseDown) {  
                            e.preventDefault();  
                        }  
                    }, false);  
                    document.addEventListener('touchend', function (e) {  
                        isMouseDown = false;  
                    }, false);  
                }  
                  
                // 开始移动  
                cvs.addEventListener(clickEvtName, function (e) {  
                    isMouseDown = true;  
                    var x = (device ? e.touches[0].clientX : e.clientX);  
                    var y = (device ? e.touches[0].clientY : e.clientY);  
                    ctx.globalCompositeOperation = 'destination-out';    // 关键部分，描述当在canvas上再次绘画时候的情况，这个设置便是之前所说的透明  
                    fillCircle.call(ctx, x, y, touchRadius);  
                    console.log("当前涂抹比例为：" + getTransparentPercent(ctx, 240, 70));  
                }, false);  
                  
                // 移动中  
                cvs.addEventListener(moveEvtName, function (e) {  
                    if (!device && !isMouseDown) {  
                        return false;  
                    }  
                    var x = (device ? e.touches[0].clientX : e.clientX);  
                    var y = (device ? e.touches[0].clientY : e.clientY);  
                    ctx.globalCompositeOperation = 'destination-out';  
                    fillCircle.call(ctx, x, y, touchRadius);  
                    console.log("当前涂抹比例为：" + getTransparentPercent(ctx, 240, 70));  
                }, false);  
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.mu-list
  overflow: hidden
  background: color-g
  // 左滑删除
  .swipeleft
    transform:translateX(-45%)
  .wrap
    display: flex
    width: 200%
    overflow: hidden
    transition:all 0.3s linear
    border-b-1px(rgba(0,0,0,.1))
    .list-item
      width: 50%
      background: color-w
      transition:all 0.3s linear
    .ms-item
      width: 15%
      padding: 1.5em 0
      font-size: 1.2em
      font-weight: 500
      text-align: center
      color: color-w
    .post-top
      background: #bdbdbd
    .sign-read
      background: #64dd17
    .delete
      background: #ff1744
  .item-right
    position:relative
    .time
      position: absolute
      top: -10px
      left: -16px
      display: inline-block 
    .mu-badge
      position: absolute
      top: 0
      left: 50%
      width:auto
      border-radius: 8px ;
      min-width:16px
      height:16px
      transform: translateX(-50%)
</style>
