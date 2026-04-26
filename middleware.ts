// import { createServerClient } from '@supabase/ssr' //migrate to EC2 
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export async function proxy(request: NextRequest) {
//   console.log('proxy hit:', request.nextUrl.pathname)

//   let response = NextResponse.next({
//     request: { headers: request.headers },
//   })
  

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll: () => request.cookies.getAll(),
//         setAll: (cookiesToSet) => {
//           cookiesToSet.forEach(({ name, value, options }) => {
//             request.cookies.set(name, value)
//             response.cookies.set(name, value, options)
//           })
//         },
//       },
//     }
//   )

//   const { data: { session } } = await supabase.auth.getSession()

//   if (!session) {
//     return NextResponse.redirect(new URL('/', request.url))
//   }

//   return response
// }

// export const config = {
//   matcher: ['/dashboard/:path*', '/details/:path*'],
// }
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/details/:path*'],
}