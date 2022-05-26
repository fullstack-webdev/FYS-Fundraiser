import { lazy } from 'react'

const DashboardAnalytics = lazy(() => import('../../views/dashboard/analytics'))
const DashboardEcommerce = lazy(() => import('../../views/dashboard/ecommerce'))

const DashboardRoutes = [
  {
    path: '/dashboard',
    element: <DashboardAnalytics />,
    meta: {
      action: 'read',
      resource: 'dashboards'
    }
  },
  {
    path: '/dashboard/analytics',
    element: <DashboardAnalytics />
  },
  {
    path: '/dashboard/ecommerce',
    element: <DashboardEcommerce />,
    meta: {
      action: 'read',
      resource: 'dashboards'
    }
  }
]

export default DashboardRoutes
