// assets
import {
  DashboardOutlined,
  AppstoreOutlined,
  UserOutlined,
  WarningOutlined,
  WechatOutlined,
} from '@ant-design/icons'

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    // {
    //   id: 'dashboard',
    //   title: 'Dashboard',
    //   type: 'item',
    //   url: '/dashboard/default',
    //   icon: DashboardOutlined,
    //   breadcrumbs: false,
    // },
    {
      id: 'category',
      title: 'Category',
      type: 'item',
      url: '/category/default',
      icon: AppstoreOutlined,
      breadcrumbs: false,
    },
    {
      id: 'user',
      title: 'User',
      type: 'item',
      url: '/user/default',
      icon: UserOutlined,
      breadcrumbs: false,
    },
    {
      id: 'report',
      title: 'Report',
      type: 'item',
      url: '/report/default',
      icon: WarningOutlined,
      breadcrumbs: false,
    },
    // {
    //   id: 'chat',
    //   title: 'Chat',
    //   type: 'item',
    //   url: '/chat/default',
    //   icon: WechatOutlined,
    //   breadcrumbs: false,
    // },
  ],
}

export default dashboard
