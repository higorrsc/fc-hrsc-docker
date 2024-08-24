# Build
FROM golang:alpine AS build

WORKDIR /app
COPY go.mod ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .
RUN apk add --no-cache binutils
RUN strip main
RUN apk add --no-cache upx
RUN upx -9 main

# https://docs.docker.com/build/building/base-images/#creating-a-simple-parent-image-using-scratch
# Run
FROM scratch

WORKDIR /app
COPY --from=build /app/main .
CMD ["./main"]