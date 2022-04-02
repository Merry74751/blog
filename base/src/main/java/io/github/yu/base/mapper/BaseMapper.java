package io.github.yu.base.mapper;

import java.io.Serializable;
import java.util.List;

public interface BaseMapper<T, Q extends T> {
    void insert(T t);

    void deleteById(Serializable id);

    void deleteByName(Serializable name);

    void updateById(T t);

    T getById(Serializable id);

    T getByName(Serializable name);

    List<T> list();

    List<T> pageList();

    List<T> pageListByQuery(Q query);
}
