## Enrollment

enroll => course/create-enrollment

res -> success / failure

```typescript
if failed
    inform user
else
    trigger => stripe/create-checkout-session

if payment successfull
    inform user
else
    delete created enrollments (rollback)
```
