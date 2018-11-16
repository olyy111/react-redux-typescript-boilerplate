import * as React from 'react';
import { Row, Col } from 'antd';
import { BreadcrumbCustom, Silder } from '../../components'
import {connect} from "react-redux";
import {RootState} from "app/reducers";
import {omit} from "app/utils";
import {commonActions} from "app/actions";
import { bindActionCreators, Dispatch } from 'redux';
import {RouteComponentProps} from "react-router";

export namespace DemoPage {
  export interface Props extends RouteComponentProps<void> {
    common: RootState.CommonState;
    actions: commonActions;
  }
}
@connect(
  (state: RootState, ownProps): Pick<DemoPage.Props, 'common'> => {
    return { common: state.common };
  },
  (dispatch: Dispatch): any => ({
    actions: bindActionCreators(omit(commonActions, 'Type'), dispatch)
  })
)
export class DemoPage extends React.Component<Partial<DemoPage.Props>> {
  constructor(props: DemoPage.Props){
    super(props)
  }
  render(){
    return(
      <Row style={{width:'1000px',margin:'0 auto'}}>
        <Col span={24}>
          <BreadcrumbCustom data={this.props.common} />
        </Col>
        <Col span={6}>
          <Silder />
        </Col>
        <Col span={18}>
          {this.props.children||'内容区域'}
        </Col>
      </Row>
    )
  }
}
