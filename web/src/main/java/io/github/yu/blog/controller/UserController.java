package io.github.yu.blog.controller;

import cn.hutool.core.util.StrUtil;
import io.github.yu.base.controller.BaseController;
import io.github.yu.base.result.BaseResult;
import io.github.yu.base.result.ObjectResult;
import io.github.yu.blog.model.User;
import io.github.yu.blog.model.UserQuery;
import io.github.yu.blog.service.UserService;
import io.github.yu.common.exception.AccountExistException;
import io.github.yu.common.exception.AccountOrPassErrorException;
import io.github.yu.common.exception.TelephoneExistException;
import io.github.yu.common.exception.UsernameExistException;
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

    @PostMapping("/loginByAccount")
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

    @PostMapping("/loginByTelephone")
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

    @GetMapping("/check/username")
    public BaseResult isUsernameExist(@RequestParam("username") String username) {
        User user = super.service.getByName(username);
        return validateUser(user);
    }

    @GetMapping("/check/account")
    public BaseResult isAccountExist(@RequestParam("account") String account) {
        User user = super.service.getByAccount(account);
        return validateUser(user);
    }

    @GetMapping("/check/telephone")
    public BaseResult isTelephoneExist(@RequestParam("telephone") String telephone) {
        User user = super.service.getByTelephone(telephone);
        return validateUser(user);
    }

    private BaseResult validateUser(User user) {
        if (user != null) {
            return BaseResult.result(400, "用户名已存在");
        }
        return BaseResult.result(200, "请求成功");
    }

}
