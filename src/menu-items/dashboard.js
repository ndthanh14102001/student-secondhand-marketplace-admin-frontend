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
      title: 'Danh mục',
      type: 'item',
      url: '/category/default',
      icon: AppstoreOutlined,
      breadcrumbs: false,
    },
    {
      id: 'user',
      title: 'Người dùng',
      type: 'item',
      url: '/user/default',
      icon: UserOutlined,
      breadcrumbs: false,
    },
    {
      id: 'report',
      title: 'Tố cáo',
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
