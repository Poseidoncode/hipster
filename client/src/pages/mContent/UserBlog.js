import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Swal from 'sweetalert2'

import MyBreadcrumb from '../../components/MyBreadcrumb'
import { getBlogDataAsync, deleteBlogDataAsync } from '../../actions/blog'

import author1 from '../../images/blog/author1.jpg'
import userBlogTop from '../../images/blog/userBlogTop.png'

function UserBlog(props) {
  const { blogData, getBlogDataAsync, deleteBlogDataAsync } = props
  const memberId = JSON.parse(localStorage.getItem('member')).id
  const memberImg = JSON.parse(localStorage.getItem('member')).img
  console.log('memberId',memberId)

  let blogDataRp = []   

  useEffect(() => {
    getBlogDataAsync() 
    console.log('componentDidMount')  
  }, [])  

  useEffect(() => {
    
    console.log('componentDidUpdate')  
  }, [blogData])  

  const handleEdit = (articleContent)=>{
    localStorage.setItem('articleContent', articleContent);
  }

  const handleDelete = (articleId)=>{      
    const deleteArticleFd = new FormData()
    deleteArticleFd.append('articleId', articleId)    
    
    for(let pair of deleteArticleFd.entries()) {
      console.log('deleteArticleFd內所有的鍵值對: ',pair[0]+ ', '+ pair[1]); 
    }
    deleteBlogDataAsync(deleteArticleFd)  
  }

  if(blogData && blogData.length){      
    blogDataRp = blogData.map((item)=>{
      const reg = /<(?:.|\s)*?>/g      
    //去除html標籤和空格符號
    item.articleContent=(item.articleContent.replace(reg,'')).replace(/&nbsp;/ig, "")
      return item
    })  
  } 

  const showBlogList = blogDataRp.map((item)=>{
    if(item.memberId==memberId)
    return (
      <>
       <hr />      
      <div className="row userblog-list-item" key={item.articleId}>
        <Link to={"/blogDetail/" + item.articleId} className="d-block col-2">
          <img src={item.articleImg} />
        </Link>
        <Link to={"/blogDetail/" + item.articleId} className="d-block col-7 text-decoration-none">
          <h3>{item.articleTitle}</h3>
          <p className="userblog-articleContent">{item.articleContent}</p>
          <p>{item.created_at}</p>
        </Link>
        <div className="col-3">
          <Link to={"/blogEdit/" + item.articleId} className="btn" onClick={()=>{handleEdit(item.articleContent)}}><i class="fas fa-edit"></i>編輯</Link>
          <button className="btn" onClick={e => {
            e.preventDefault()
            Swal.fire({
              title: `刪除 ${item.articleTitle} ?`,
              // text: '',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: '確定',
              cancelButtonText: '取消'
            }).then((result) => {
              if (result.value) {
                handleDelete(item.articleId)
                Swal.fire({
                  title:'刪除成功',
                  icon: 'success'
                }).then(()=>{
                  props.history.go(0)
                })                             
              }
            })
            // if(window.confirm('確認刪除?')){
            //   handleDelete(item.articleId)
            //   props.history.go(0)
            // }
          }}>
            <i className="fa fa-trash" aria-hidden="true"></i>刪除
          </button>
        </div>
      </div>      
    </>
    )
  })

  

  return (
    <>
      <div className="usercontainer">
        <h2 className="usertitle mb-3">我的文章</h2>
      </div>
      <div className="row userBlogTop">
        <img src={userBlogTop} />
      </div>
      <div className="row">
        <Link to="/blogAdd/" className="btn userblog-btn-add d-block"><i class="fas fa-plus-square"></i>發表新文章</Link>
      </div>
      {showBlogList}     
    </>
  )
}

const mapStateToProps = (store) =>({ blogData: store.blogReducer.blogData})

export default withRouter(connect(mapStateToProps, {
  getBlogDataAsync,
  deleteBlogDataAsync,
})(UserBlog))