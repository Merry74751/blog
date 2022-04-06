package io.github.yu.blog.controller;

import cn.hutool.core.util.StrUtil;
import io.github.yu.base.controller.BaseController;
import io.github.yu.base.result.ObjectResult;
import io.github.yu.blog.model.User;
import io.github.yu.blog.model.UserQuery;
import io.github.yu.blog.service.UserService;
import io.github.yu.common.exception.AccountOrPassErrorException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
public class UserController extends BaseController<User, UserQuery, UserService> {
    @Override
    @PostMapping("/insert")
    public void insert(@RequestBody @Validated User user) {
        super.insert(user);
    }

    @GetMapping("/getByAccount")
    public User getByAccount(@RequestParam String account) {
        return this.service.getByAccount(account);
    }

    @PostMapping(value = "/loginByAccount", produces = {"application/json;charset=UTF-8"})
    public ObjectResult loginByAccount(@RequestBody User user) {
        if (StrUtil.isEmpty(user.getAccount())) {
            throw new AccountOrPassErrorException();
        }
        if (StrUtil.isEmpty(user.getPassword())) {
            throw new AccountOrPassErrorException();
        }
        String s = super.service.loginByAccount(user);
        return ObjectResult.result(s);
    }

    @PostMapping(value = "/loginByTelephone", produces = {"application/json;charset=UTF-8"})
    public ObjectResult loginByTelephone(@RequestBody User user) {
        if (StrUtil.isEmpty(user.getTelephone())) {
            throw new AccountOrPassErrorException();
        }
        if (StrUtil.isEmpty(user.getPassword())) {
            throw new AccountOrPassErrorException();
        }
        String s = super.service.loginByTelephone(user);
        return ObjectResult.result(s);
    }
}
