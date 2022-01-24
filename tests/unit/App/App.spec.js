import {createLocalVue, mount} from "@vue/test-utils";
import App from "@/App";
import Vuex from "vuex";
import {actions, getters, mutations, state} from "@/store";

describe("App.vue",() => {
    // h1 exists
    it('should h1 exits', function () {
        let wrapper=mountComponent()
        let h1=wrapper.find("h1")
        expect(h1.exists()).toBeTruthy()
    });

    // h1 text equals to Daily Corona Cases in Turkey check
    it('should h1 text equals to Daily Corona Cases in Turkey', function () {
        let wrapper=mountComponent()
        let h1=wrapper.find("h1")
        expect(h1.text()).toContain("Daily Corona Cases in Turkey")
    });

    // notificationArea check based on getCount value being smaller than 5
    it('should notificationArea class is safe based on getCount value', async function () {
        let wrapper=mountComponent()
        let notifArea=wrapper.find(".notificationArea")
        state.count=4
        await wrapper.vm.$nextTick();
        expect(notifArea.classes()).toContain("safe")
        expect(notifArea.text()).toContain(`So safe. Case count is ${state.count}k`)
    });

    // notificationArea class check based on getCount value being bigger than 5 and smaller than 10
    it('should notificationArea class is normal based on getCount value', async function () {
        let wrapper=mountComponent()
        let notifArea=wrapper.find(".notificationArea")
        state.count=7
        await wrapper.vm.$nextTick();
        expect(notifArea.classes()).toContain("normal")
        expect(notifArea.text()).toContain(`Life is normal. Case count is ${state.count}k`)
    });


    // notificationArea class check based on getCount value being bigger than 10
    it('should notificationArea class is danger based on getCount value', async function () {
        let wrapper=mountComponent()
        let notifArea=wrapper.find(".notificationArea")
        state.count=14
        await wrapper.vm.$nextTick();
        expect(notifArea.classes()).toContain("danger")
        expect(notifArea.text()).toContain(`Danger!!! Case count is ${state.count}k`)
    });
})

function mountComponent() {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    return mount(App,{
        localVue,
        store:new Vuex.Store({
            state,getters,mutations,actions
        }),
    })
}