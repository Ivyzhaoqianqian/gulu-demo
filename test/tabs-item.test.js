const expect = chai.expect;
import Vue from 'vue'
import Tabs from '../src/tabs'
import TabsPane from "../src/tabs-pane"
import TabsBody from "../src/tabs-body"
import TabsItem from "../src/tabs-item"
import TabsHeader from "../src/tabs-head"
import sinonChai from 'sinon-chai';

Vue.component('g-tabs', Tabs)
Vue.component('g-tabs-head', TabsHeader)
Vue.component('g-tabs-item', TabsItem)
Vue.component('g-tabs-body', TabsBody)
Vue.component('g-tabs-pane', TabsPane)

Vue.config.productionTip = false
Vue.config.devtools = false

describe('TabsItem', () => {
    it('存在.', () => {
        expect(TabsItem).to.be.ok
    })

    it('接收name属性', () => {
        const Constructor = Vue.extend(TabsItem)
        const vm = new Constructor({
            propsData: {
                name: 'xxx',
            }
        }).$mount()
        expect(vm.$el.getAttribute('data-name')).to.eq('xxx')
    })

    it('接收disabled 属性', () => {
        const Constructor = Vue.extend(TabsItem)
        const vm = new Constructor({
            propsData: {
                disabled: true,
            }
        }).$mount()
        expect(vm.$el.classList.contains('disabled')).to.be.true
        const callback = sinon.fake()
        vm.$on('click', callback)
        vm.$el.click()
        expect(callback).to.have.not.been.called
    })
})
