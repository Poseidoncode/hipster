import React, { useState, useEffect } from 'react'
import { Dropdown } from 'react-bootstrap'
import Calendar from 'react-calendar'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import '../../styles/product/AsideBar.scss'

import { getProductCategoryAsync } from '../../actions/product/getProductCategory'

function AsideBar(props) {
  // const getProductCategoryAsync = async (productCategory) => {
  //   const request = new Request('http://127.0.0.1:5000/productCategory', {
  //     method: 'GET',
  //     headers: new Headers({
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     }),
  //   })

  //   const response = await fetch(request)
  //   const data = await response.json()
  //   console.log(data)
  // }

  const { productData, getProductCategoryAsync } = props

  useEffect(() => {
    getProductCategoryAsync()
  }, [])

  // console.log('props', props)
  // console.log('productData', productData)
  const display = productData.map((item, index) => {
    if (item.categoryParentId === 0) {
    } else {
      return (
        <>
          <li className="checkbox">
            <i className="far fa-square"></i>
            {item.categoryName}
          </li>
        </>
      )
    }
  })

  return (
    <>
      <aside className="aside-wrapper col-md-3">
        <div className="aside-wrapper-filter-box">
          <h3>所有商品類別</h3>
          <div>
            <div className="drop-title">
              <h5>戶外活動</h5>
            </div>
            <ul className="checkbox-dropdown-list">
              <li className="checkbox">
                <i className="far fa-square"></i>1
              </li>
              <li className="checkbox">1</li>
              <li className="checkbox">1</li>
              <li className="checkbox">1</li>
            </ul>
          </div>
          <div>
            <div className="drop-title">
              <h5>戶外活動</h5>
            </div>
            <ul className="checkbox-dropdown-list">
              <li className="checkbox">1</li>
              <li className="checkbox">2</li>
              <li className="checkbox">1</li>
              <li className="checkbox">1</li>
            </ul>
          </div>
          <div>
            <div className="drop-title">
              <h5>戶外活動</h5>
            </div>
            <ul className="checkbox-dropdown-list active">{display}</ul>
          </div>
          <div>
            <div className="drop-title">
              <h5>戶外活動</h5>
            </div>
            <ul className="checkbox-dropdown-list">
              <li className="checkbox">1</li>
              <li className="checkbox">1</li>
              <li className="checkbox">1</li>
              <li className="checkbox">1</li>
            </ul>
          </div>
        </div>
        <Dropdown>
          <Dropdown.Toggle className="aside-wrapper-filter-box" drop={'down'}>
            <h3>篩選出發日期</h3>
          </Dropdown.Toggle>
          <Dropdown.Menu></Dropdown.Menu>
        </Dropdown>
        <div className="aside-wrapper-filter-box">
          <h3>導覽語言</h3>
          <ul className="checkbox-dropdown-list">
            <li className="type-li active">全部</li>
            <li className="type-li active">中文</li>
            <li className="type-li active">English</li>
            <li className="type-li active">日本語</li>
          </ul>
        </div>
        <div className="aside-wrapper-filter-box">
          <h3>行程時間</h3>
          <ul className="checkbox-dropdown-list">
            <li className="type-li active">0~1小時</li>
            <li className="type-li active">1~3小時</li>
            <li className="type-li active">3~5小時</li>
            <li className="type-li active">5小時以上</li>
          </ul>
        </div>
      </aside>
    </>
  )
}

// export default AsideBar

// 將redux中的store的state(狀態)
// 對應到這個元件中的props中
const mapStateToProps = (store) => {
  return { productData: store.productReducer.productData }
}

// 綁定store的dispatch方法到這個元件的props
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({ addValue, minusValue }, dispatch)
// }

// 高階元件的樣式，必要的
export default connect(mapStateToProps, {
  getProductCategoryAsync,
})(AsideBar)
