FROM mysql:5.7

WORKDIR /docker-entrypoint-initdb.d

COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 3306

CMD [ "mysqld_safe" ]
