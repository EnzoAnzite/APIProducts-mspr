FROM ubuntu:latest
LABEL authors="eanzite"

ENTRYPOINT ["top", "-b"]