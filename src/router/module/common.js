import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/common',
  component: Layout,
  redirect: '/common/groupManage',
  name: '系统管理',
  icon: 'gongsiguanli',
  meta: {
    title: '系统管理', code: 'SYSTEM'
  },
  children: [
    {
      path: '/common/index',
      icon: 'information',
      hidden: true,
      name: '公司管理',
      component: _import('common/index'),
      meta: { title: '公司管理', stitle: '公司', noCache: true, code: '' }
    },
    {
      path: '/common/groupManage',
      icon: 'zuzhijiagou',
      hidden: false,
      name: '组织机构',
      component: _import('common/groupManage/index'),
      meta: { title: '组织机构', stitle: '机构', noCache: true, code: 'SYSTEM_ORG' }
    },
    {
      path: '/common/permissionManage',
      icon: 'quanxianguanli',
      hidden: false,
      name: '角色管理',
      component: _import('common/permissionManage/index'),
      meta: { title: '角色管理', stitle: '角色', noCache: true, code: 'SYSTEM_AUTH_MANEGE' }
    },
    {
      path: '/common/employeeManage',
      icon: 'yuangongguanli',
      hidden: false,
      name: '员工管理',
      component: _import('common/employeeManage/index'),
      meta: { title: '员工管理', stitle: '员工', noCache: true, code: 'SYSTEM_EMPLOYEE_MANAGE' }
    },
    {
      path: '/common/BusinessGroup',
      icon: 'ywfz',
      hidden: false,
      name: '业务分组',
      component: _import('common/BusinessGroup/index'),
      meta: { title: '业务分组', stitle: '业务', noCache: true, code: 'SYSTEM_BUSINESS_GROUP' }
    },
    {
      path: '/common/dataDictionary',
      icon: 'sjzd',
      hidden: false,
      name: '数据字典',
      component: _import('common/dataDictionary/index'),
      meta: { title: '数据字典', stitle: '数据', noCache: true, code: 'SYSTEM_DICT' }
    },
    {
      path: '/common/task',
      icon: 'rwdd',
      hidden: true,
      name: '任务调度',
      component: _import('common/index'),
      meta: { title: '任务调度', stitle: '任务', noCache: true, code: 'SYSTEM_TASK' },
      children: [
        {
          path: '/common/task/taskDispatch',
          icon: 'QQ',
          name: '任务管理',
          component: _import('common/task/taskDispatch/index'),
          meta: { role: ['admin'], title: '任务管理', stitle: '任务', noCache: true, code: 'SYSTEM_TASK_TASK_MANAGE' }
        },
        {
          path: '/common/task/taskLog',
          icon: 'QQ',
          name: '调度日志',
          component: _import('common/task/taskLog/index'),
          meta: { role: ['admin'], title: '调度日志', stitle: '日志', noCache: true, code: 'SYSTEM_TASK_DISPATCH_LOG' }
        },
        {
          path: '/common/task/taskExecute',
          icon: 'QQ',
          name: '执行器管理',
          component: _import('common/task/taskExecute/index'),
          meta: { role: ['admin'], title: '执行器管理', stitle: '执行器', noCache: true, code: 'SYSTEM_TASK_EXECUTE_MANAGE' }
        }
      ]
    },
    {
      path: '/common/businessCity',
      icon: 'rwdd',
      hidden: false,
      name: '开放城市',
      component: _import('common/businessCity/index'),
      meta: { title: '开放城市', stitle: '城市', noCache: true, code: 'SYSTEM_CITY' }
    },
    {
      path: '/common/appManage',
      icon: 'sijiguanli',
      hidden: false,
      name: 'APP管理',
      component: _import('common/appManage/index'),
      meta: { title: 'APP管理', stitle: 'APP', noCache: true, code: 'SYSTEM_APP_MANAGE' }
    },
    {
      path: '/common/businessCity/City',
      icon: 'sijiguanli',
      hidden: true,
      name: '业务城市围栏',
      component: _import('common/businessCity/businessCityMap'),
      meta: { title: '城市围栏', stitle: '围栏', noCache: true }
    },
    {
      path: '/common/collegeManage',
      icon: 'sijiguanli',
      name: '车主学院管理',
      component: _import('common/collegeManage/index'),
      meta: { title: '车主学院管理', stitle: '学院', noCache: true, code: 'SYSTEM_DRIVER_COLLEGE_MANAGE' },
      children: [
        {
          path: '/common/collegeManage/classifiedManage',
          hidden: false,
          name: '课程分类管理',
          component: _import('common/collegeManage/classifiedManage/index'),
          meta: { title: '课程分类管理', stitle: '课程分类管理', noCache: true, code: 'SYSTEM_DRIVER_COLLEGE_MANAGE_COURSE_CLASS' }
        },
        {
          path: '/common/collegeManage/contentManage',
          hidden: false,
          name: '课程内容管理',
          component: _import('common/collegeManage/contentManage/index'),
          meta: { title: '课程内容管理', stitle: '课程内容管理', noCache: true, code: 'SYSTEM_DRIVER_COLLEGE_MANAGE_COURSE_CONTENT' }
        },
        {
          path: '/common/collegeManage/learningRecord',
          hidden: false,
          name: '车主学习记录',
          component: _import('common/collegeManage/learningRecord/index'),
          meta: { title: '车主学习记录', stitle: '车主学习记录', noCache: true, code: 'SYSTEM_DRIVER_COLLEGE_MANAGE_DRIVER_STUDY_RECORD' }
        }
      ]
    },
    {
      path: '/common/examinationManage',
      icon: 'sijiguanli',
      name: '车主考试管理',
      component: _import('common/examinationManage/index'),
      meta: { title: '车主考试管理', stitle: '考试', noCache: true, code: 'SYSTEM_DRIVER_TEST_MANAGE' },
      children: [
        {
          path: '/common/examinationManage/itemManage',
          hidden: false,
          name: '车主题库管理',
          component: _import('common/examinationManage/itemManage/index'),
          meta: { title: '车主题库管理', stitle: '车主题库管理', noCache: true, code: 'SYSTEM_DRIVER_TEST_MANAGE_DRIVER_QUESTION_BANK' }
        },
        {
          path: '/common/examinationManage/paperManage',
          hidden: false,
          name: '车主考卷管理',
          component: _import('common/examinationManage/paperManage/index_new'),
          meta: { title: '车主考卷管理', stitle: '车主考卷管理', noCache: true, code: 'SYSTEM_DRIVER_TEST_MANAGE_COURSE_PAPER' }
        },
        {
          path: '/common/examinationManage/examinationResults',
          hidden: false,
          name: '车主考试结果',
          component: _import('common/examinationManage/examinationResults/index_new'),
          meta: { title: '车主考试结果', stitle: '车主考试结果', noCache: true, code: 'SYSTEM_DRIVER_TEST_MANAGE_DRIVER_TEST_RESULT' }
        }
      ]
    },
    {
      path: '/common/salesmanManage',
      icon: 'sijiguanli',
      name: '业务员学院管理',
      component: _import('common/salesmanManage/index'),
      meta: { title: '业务员学院管理', stitle: '学院', noCache: true, code: 'SYSTEM_SALESMANCOLLEGE' },
      children: [
        {
          path: '/common/salesmanManage/classifiedManage',
          hidden: false,
          name: '业务员课程分类管理',
          component: _import('common/salesmanManage/classifiedManage/index'),
          meta: { title: '业务员课程分类管理', stitle: '业务员课程分类管理', noCache: true, code: 'SYSTEM_SALESMANCOLLEGE_SALESMANCOURSE' }
        },
        {
          path: '/common/salesmanManage/contentManage',
          hidden: false,
          name: '业务员课程内容管理',
          component: _import('common/salesmanManage/contentManage/index'),
          meta: { title: '业务员课程内容管理', stitle: '业务员课程内容管理', noCache: true, code: 'SYSTEM_SALESMANCOLLEGE_SALESMANCOURSECONTENT' }
        },
        {
          path: '/common/salesmanManage/learningRecord',
          hidden: false,
          name: '业务员学习记录',
          component: _import('common/salesmanManage/learningRecord/index'),
          meta: { title: '业务员学习记录', stitle: '业务员学习记录', noCache: true, code: 'SYSTEM_SALESMANCOLLEGE_SALESMANLEARNINGRECORD' }
        }
      ]
    },
    {
      path: '/common/salesmanExaminationManage',
      icon: 'sijiguanli',
      name: '业务员考试管理',
      component: _import('common/salesmanExaminationManage/index'),
      meta: { title: '业务员考试管理', stitle: '考试', noCache: true, code: 'SYSTEM_SALESMANEXAMINATION' },
      children: [
        {
          path: '/common/salesmanExaminationManage/itemManage',
          hidden: false,
          name: '业务员题库管理',
          component: _import('common/salesmanExaminationManage/itemManage/index'),
          meta: { title: '业务员题库管理', stitle: '业务员题库管理', noCache: true, code: 'SYSTEM_SALESMANEXAMINATION_SALESMANQUESTIONBANK' }
        },
        {
          path: '/common/salesmanExaminationManage/paperManage',
          hidden: false,
          name: '业务员考卷管理',
          component: _import('common/salesmanExaminationManage/paperManage/index'),
          meta: { title: '业务员考卷管理', stitle: '业务员考卷管理', noCache: true, code: 'SYSTEM_SALESMANEXAMINATION_EXAMINATIONPAPER' }
        },
        {
          path: '/common/salesmanExaminationManage/examinationResults',
          hidden: false,
          name: '业务员考试结果',
          component: _import('common/salesmanExaminationManage/examinationResults/index'),
          meta: { title: '业务员考试结果', stitle: '业务员考试结果', noCache: true, code: 'SYSTEM_SALESMANEXAMINATION_SALESMANTESTRESULTS' }
        }
      ]
    }
  ]
}
