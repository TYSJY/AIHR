package com.aihr.modules.subscription.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.aihr.modules.subscription.entity.SubscriptionStatus;
import org.apache.ibatis.annotations.Mapper;

/**
 * 订阅状态Mapper
 *
 * @author AIHR
 * @since 1.0.0
 */
@Mapper
public interface SubscriptionStatusMapper extends BaseMapper<SubscriptionStatus> {
}

