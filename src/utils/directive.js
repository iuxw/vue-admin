import Vue from 'vue'

/**
 * 表格头部脱离表格浮动效果
 * @desc 表格滚动将表头浮起
 * @author 刘晓伟
 * @date 2018/10/23
 * @param {Number}  minHeight 最小高度
 * @param {Number}  minWidth  最小宽度
 * @example <div v-fixed-th><el-table></el-table></div> 盒子中只有一个el-table
 * @example <div v-fixed-th="{id: 'oneTableId'}"><el-table id="oneTableId"></el-table></div> 盒子中有多个el-table时需指定一个ID
 */
Vue.directive('fixedTh', {
  inserted (el, binding) {
    const top = el.getBoundingClientRect().top
    const tables = el.getElementsByClassName('el-table')
    let table
    if (binding.value && binding.value.id) {
      for (let i = 0; i < tables.length; i++) {
        if (tables[i].getAttribute('id') === binding.value.id) {
          table = tables[i]
        }
      }
    } else {
      table = tables[0]
    }
    const header = table.getElementsByClassName('el-table__header-wrapper')[0]
    const body = table.getElementsByClassName('el-table__body-wrapper')[0]
    const onScroll = (e) => {
      console.log(table.getBoundingClientRect())
      const tableTop = table.getBoundingClientRect().top
      const headerHeight = header.getBoundingClientRect().height
      if (tableTop - top < 0) {
        header.style.position = 'fixed'
        header.style.top = top + 'px'
        header.style.zIndex = 1
        body.style.marginTop = headerHeight + 'px'
        header.style.width = body.getBoundingClientRect().width + 'px'
      } else if (tableTop - top > 0) {
        header.style.position = 'static'
        body.style.marginTop = 0
      }
    }
    el.addEventListener('scroll', onScroll)
  }
})
