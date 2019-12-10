<style lang="less" scoped>
@keyframes wave {
  0% {
    transform: translateY(-3px);
  }
  50% {
    transform: translateY(3px);
  }
  100% {
    transform: translateY(-3px);
  }
}

@keyframes treeFlip {
  from {
    transform: scale3d(1, 1, 1) translateX(-50%);
  }
  50% {
    transform: scale3d(1, 0.95, 1) translateX(-50%);
  }
  to {
    transform: scale3d(1, 1, 1) translateX(-50%);
  }
}

.js-version-container {
  width: 100%;
  height: 667px;
  background: url("../assets/bg.jpg") no-repeat 100% 100%;
  position: relative;
}

.tree {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  transform-origin: bottom;
}

.flip {
  animation: treeFlip 0.7s ease-in-out;
}

.circle {
  position: absolute;
  background: linear-gradient(to top, green 0%, lightgreen 70%, white 100%);
}

.circle-text {
  color: #fff;
}

.wave {
  animation: wave 2.5s infinite ease-in-out;
}
</style>
<template>
  <div class="js-version-container" :style="{height: cHeight}">
    <img src="../assets/tree.png" :class="['tree', moveEnd ? 'flip' : '']" :style="{width: `${treeWidth}px`, height: `${treeHeight}px`}"/>
    <div :class="['circle', targetIndex === index ? '' : 'wave']" :style="circleStyle(item)" v-for="(item, index) in circleArr" :key="index" @click="startMove(index)">
      <div class="circle-text">+{{item.count}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'jsVersion',
  data () {
    return {
      canvas: null,
      cxt: null,
      circlePadding: 50, // 左右边距，也会影响到生成的球的横坐标边界
      treeWidth: 200, // 树的宽度
      treeHeight: 300, // 树的高度
      moveTarget: null, // 移动对象
      targetIndex: null, // 被点击的对象的索引
      isMoving: false, // 是否在移动中
      moveEnd: false, // 移动结束状态，用于触发树的动画
      circleArr: [], // 所有点的集合数组
      xArr: [], // 所有点的横坐标数组
      easing: 0.15, // 阻尼系数
      r: 24 // 圆形半径
    }
  },
  computed: {
    cWidth () {
      return window.innerWidth
    },
    cHeight () {
      return window.innerHeight
    },
    centerX () {
      return this.cWidth / 2
    },
    centerY () {
      return this.cHeight / 2
    }
  },
  watch: {
    isMoving (nv, ov) {
      if (!nv && ov) {
        this.moveEnd = true
      } else if (nv && !ov) {
        this.moveEnd = false
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.createList(6)
    },
    circleStyle (item) {
      const r = item.r * 2
      return {
        top: `${item.y}px`,
        left: `${item.x}px`,
        width: `${r}px`,
        height: `${r}px`,
        lineHeight: `${r}px`,
        borderRadius: '50%',
        transform: `scale(${item.scale})`
      }
    },
    startMove (index) {
      if (!this.isMoving) {
        this.moveTarget = this.circleArr[index]
        this.targetIndex = index
        this.isMoving = true
        this.move()
      }
    },
    move () {
      if (this.moveTarget) {
        let { moveTarget, centerX, centerY, easing } = this
        // 当目标距离中心点很近的时候停止动画，否则继续执行动画
        if (Math.abs(moveTarget.x - centerX) > 5 && Math.abs(moveTarget.y - centerY) > 5) {
          // 每次移动距离目标点剩余距离的阻尼倍数的距离，以此实现阻尼效果
          moveTarget.x += (centerX - moveTarget.x) * easing
          moveTarget.y += (centerY - moveTarget.y) * easing
          moveTarget.scale -= 0.02
          window.requestAnimationFrame(this.move)
        } else {
          this.isMoving = false
          this.moveTarget = null
          this.circleArr.splice(this.targetIndex, 1)
          this.targetIndex = null
        }
      }
    },
    randomNum (from, to) {
      return Math.floor(Math.random() * (to - from + 1) + from)
    },
    createList (count) {
      let { cWidth, cHeight, circlePadding, treeHeight } = this
      let index = 0
      while (this.circleArr.length < count) {
        if (index > 100) return false
        index++
        var x = this.randomNum(circlePadding, cWidth - circlePadding)
        var y = this.randomNum(cHeight - treeHeight - 220, cHeight - treeHeight - 120)
        if (!this.isNear(x)) {
          this.circleArr.push({
            x,
            y,
            r: this.r,
            count: this.randomNum(1, 20),
            scale: 1
          })
          this.xArr.push(x)
        }
      }
    },
    isNear (x) {
      var near = false
      this.xArr.forEach(val => {
        // 本来为至少要小于2倍半径，但如果其余4个点把屏幕4均分了，第5个点就永远满足不了条件，故改为小于1.5倍半径
        // 如果两个圆的x相差小于1.5呗半径，即有多于4/3个圆的部分重叠，则判断为太近
        if (Math.abs(x - val) < (this.r * 3) / 2) {
          near = true
        }
      })
      return near
    }
  }
}
</script>
