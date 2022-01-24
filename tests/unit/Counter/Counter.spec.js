import {createLocalVue, mount} from '@vue/test-utils'
import Counter from "@/Counter";
import Vuex from "vuex";
import {actions, getters, mutations, state} from "@/store";

describe("Counter.vue",()=>{

    // Component Exist Check
    it('should component exists', function () {
        let wrapper=mountComponent()
        expect(wrapper.exists()).toBeTruthy()
    });

    // Increase button exist check
    it('should increase button exists', function () {
        let wrapper=mountComponent()
        let buttons = wrapper.findAll("button");
        let incButton=buttons.at(1)
        expect(incButton.text()).toContain("Increase")
        expect(incButton.exists()).toBeTruthy()
    });

    // Increase button functionality check
    it('should increase button functionality check', async function () {
        let increase=jest.spyOn(Counter.methods,"increase")
        let wrapper=mountComponent()
        wrapper.findAll("button").at(1).trigger('click');
        expect(increase).toHaveBeenCalled()
    });

    // Decrease button exist check
    it('should decrease button exists', function () {
        let wrapper=mountComponent()
        let buttons = wrapper.findAll("button");
        let decButton=buttons.at(0)
        expect(decButton.text()).toContain("Decrease")
        expect(decButton.exists()).toBeTruthy()
    });

    // Decrease button functionality check
    it('should decrease button functionality check', async function () {
        let decrease=jest.spyOn(Counter.methods,"decrease")
        let wrapper=mountComponent()
        wrapper.findAll("button").at(0).trigger('click');
        expect(decrease).toHaveBeenCalled()
    });

    // 2 increase + decrease functionality check together
    it('should 2 increase + decrease functionality check together', async function () {
        let increase=jest.spyOn(Counter.methods,"increase")
        let decrease=jest.spyOn(Counter.methods,"decrease")
        let wrapper=mountComponent()
        let buttons = wrapper.findAll("button");
        let span = wrapper.find("span")
        let incButton=buttons.at(0)
        let decButton=buttons.at(1)
        incButton.trigger('click')
        expect(increase).toHaveBeenCalled()
        incButton.trigger('click')
        expect(increase).toHaveBeenCalled()
        decButton.trigger('click')
        expect(decrease).toHaveBeenCalled()
        await wrapper.vm.$nextTick()
        expect(span.text()).toContain("1k")
    });

    // Count text show check
    it('should Count text show', function () {
        let wrapper=mountComponent()
        let span=wrapper.find("span")
        expect(span.text()).toContain(`${state.count}k`)
    });

})

function mountComponent() {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    return mount(Counter,{
        localVue,
        store:new Vuex.Store({
            state,getters,mutations,actions
        }),
    })
}