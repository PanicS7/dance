export default function ({ store, redirect, route }) {
  const login =
    store.state.user != null && route.name === 'login'
      ? redirect('/account')
      : ''
  const signup =
    store.state.user != null && route.name === 'signup'
      ? redirect('/account')
      : ''
  const router =
    store.state.user == null && isAccountRoute(route) ? redirect('/login') : ''

  return { login, signup, router }
}

function isAccountRoute(route) {
  if (route.matched.some((record) => record.path === '/account')) {
    return true
  } else if (route.matched.some((record) => record.path === '/upload')) {
    return true
  }
}
