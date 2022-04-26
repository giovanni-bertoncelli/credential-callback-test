// Require the framework and instantiate it

import Fastify from 'fastify'
import FastifyCookie from 'fastify-cookie'
import FastifyCors from 'fastify-cors';

const fastify = Fastify({
  logger: true,
})

fastify.register(FastifyCookie, {
  secret: 'kitty',
  parseOptions: {}
})

fastify.register(FastifyCors, {
  origin: ['http://localhost:4200'],
  methods: ['GET', 'POST', 'PUT'],
  credentials: true
})

// Declare a route
fastify.get('/oauth/test', function (request, reply) {
  reply.setCookie('refresh_jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlIjoiaW50ZXJuYWxfY3JlZGVudGlhbHMiLCJzZXNzaW9uSWQiOiI2NGRhNGFhYi0wZjMzLTQ2OGYtOGE1Yi05MzNjYzUyZDljOWQiLCJwcmluY2lwYWwiOnsiaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImluZm9AY3Rpbm5vdmF0aW9uLml0IiwiaXNFbWFpbFZlcmlmaWVkIjpmYWxzZSwicm9sZSI6eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZGVzY3JpcHRpb24iOiJVdGVudGUgY2hlIGFjY2VkZSBhIHF1YWx1bnF1ZSByaXNvcnNhIGRlbCBzaXN0ZW1hIiwiaXNTdXBlcnVzZXIiOnRydWUsImlzQ3VzdG9tIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyMC0wNC0wNlQxNDo1MTo0My4wNTNaIiwidXBkYXRlZEF0IjoiMjAyMC0wNC0wNlQxNDo1MTo0My4wNTNaIn19LCJpYXQiOjE2NTA5Njg5NDgsIm5iZiI6MTY1MDk2ODk0OCwiZXhwIjoxNjUxMDU1MzQ4LCJhdWQiOiJhdXRoOmdlby5jdGlubm92YXRpb24uaXQiLCJpc3MiOiJHRU9fQVBJIiwic3ViIjoiNjRkYTRhYWItMGYzMy00NjhmLThhNWItOTMzY2M1MmQ5YzlkIiwianRpIjoiYWE4Y2MxNTYtMjhiZS00NWUxLWEzNzYtZDI3M2Y3MTRhN2NiIn0.B2_PYzBXrhs4LMYpbG7AIqGeHfEM__zsRq7LXgLbzKg', {
    sameSite: 'strict',
    secure: true,
    path: '/',
    expires: new Date('Wed Apr 27 2022 10:29:08 GMT+0000'),
    httpOnly: true
  })
  reply.redirect(
    302,
    'http://localhost:4200/callback#jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlIjoiaW50ZXJuYWxfY3JlZGVudGlhbHMiLCJwcmluY2lwYWwiOnsiaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImluZm9AY3Rpbm5vdmF0aW9uLml0IiwiaXNFbWFpbFZlcmlmaWVkIjpmYWxzZSwicm9sZSI6eyJpZCI6MSwibmFtZSI6ImFkbWluIn19LCJhY2xzIjpbeyJzZXJ2aWNlIjoiKiIsImFjdGlvbiI6IioiLCJhbGxvdyI6dHJ1ZX0seyJzZXJ2aWNlIjoiYXBwVG9rZW5zIiwiYWN0aW9uIjoiZ2VuZXJhdGVBcHBUb2tlbiIsImFsbG93Ijp0cnVlfSx7InNlcnZpY2UiOiJhcHBUb2tlbnMiLCJhY3Rpb24iOiJ1cGRhdGUiLCJhbGxvdyI6dHJ1ZX0seyJzZXJ2aWNlIjoidXNlcnMiLCJhY3Rpb24iOiJjdXJyZW50R2V0IiwiYWxsb3ciOnRydWV9LHsic2VydmljZSI6InVzZXJzIiwiYWN0aW9uIjoiY3VycmVudEdldEFwcFRva2VucyIsImFsbG93Ijp0cnVlfSx7InNlcnZpY2UiOiJ1c2VycyIsImFjdGlvbiI6ImN1cnJlbnRSZW1vdmVBcHBUb2tlbiIsImFsbG93Ijp0cnVlfSx7InNlcnZpY2UiOiJ1c2VycyIsImFjdGlvbiI6ImN1cnJlbnRVcGRhdGUiLCJhbGxvdyI6dHJ1ZX0seyJzZXJ2aWNlIjoidXNlcnMiLCJhY3Rpb24iOiJjdXJyZW50Q2hhbmdlUGFzc3dvcmQiLCJhbGxvdyI6dHJ1ZX0seyJzZXJ2aWNlIjoidXNlcnMiLCJhY3Rpb24iOiJzZW5kVmVyaWZ5RW1haWwiLCJhbGxvdyI6dHJ1ZX0seyJzZXJ2aWNlIjoidXNlcnMiLCJhY3Rpb24iOiJsb2dvdXRKV1QiLCJhbGxvdyI6dHJ1ZX0seyJzZXJ2aWNlIjoiY3VzdG9tQ29uZmlnIiwiYWN0aW9uIjoiZ2V0QWxpYXNlc0xhYmVscyIsImFsbG93Ijp0cnVlfSx7InNlcnZpY2UiOiJ0YWdzQ2FjaGUiLCJhY3Rpb24iOiIkVklFVyIsImFsbG93Ijp0cnVlfSx7InNlcnZpY2UiOiJkaWFnbm9zdGljIiwiYWN0aW9uIjoiZ2V0U3RhdHVzIiwiYWxsb3ciOnRydWV9LHsic2VydmljZSI6ImFjbHMiLCJhY3Rpb24iOiJmaW5kU2NvcGVzIiwiYWxsb3ciOnRydWV9LHsic2VydmljZSI6ImFwcFRva2VucyIsImFjdGlvbiI6ImxvZ2luIiwiYWxsb3ciOnRydWV9LHsic2VydmljZSI6InVzZXJzIiwiYWN0aW9uIjoicmVmcmVzaEpXVCIsImFsbG93Ijp0cnVlfSx7InNlcnZpY2UiOiJyZW1vdGVBdXRoIiwiYWN0aW9uIjoibG9naW4iLCJhbGxvdyI6dHJ1ZX1dLCJpYXQiOjE2NTA5NjY0MjksIm5iZiI6MTY1MDk2NjQyOSwiZXhwIjoxNjUwOTY2NzI5LCJhdWQiOiJhdXRoOmdlby5jdGlubm92YXRpb24uaXQiLCJpc3MiOiJHRU9fQVBJIiwic3ViIjoiMSIsImp0aSI6ImE5NWUyZjdkLTQ2NzYtNDllNC1hMTMzLTQzMGRmY2U1OTM2MSJ9.mktDGtJqlshDYeZBaFG-w6Ry5lRjmA_PH_4k2X5TUfA,renewIn=180000'
  );
})

fastify.get('/test', function (req, reply) {
  return Promise.resolve({
    bearer: req.headers.authorization,
    refresh: req.cookies.refresh_jwt
  })
})

fastify.get('/refresh', function (req, reply) {
  if (
    req.cookies.refresh_jwt
  ) {
    return Promise.resolve({
      found: true,
      value: req.cookies.refresh_jwt
    })
  }
  return Promise.reject({
    found: false,
  })
})

// Run the server!
fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})