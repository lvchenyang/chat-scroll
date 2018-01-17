/**
 * Created by lvcy on 18-1-2.
 */
import React, {PureComponent} from 'react';
import {ComponentWrapper, ComponentLoading} from '../Theme/ComponentStyled';

class CustomComponent extends PureComponent {
    render() {
        const {component, data} = this.props.message;
        const loading = !component || !data;
        const RenderComponent = component;
        return (
            <ComponentWrapper>
                {loading && <ComponentLoading>消息组件正在加载中...</ComponentLoading>}
                {!loading && <RenderComponent {...data}/>}
            </ComponentWrapper>
        );
    }
    componentDidMount() {
        this.props.message.resolve();
    }
}
export default CustomComponent;