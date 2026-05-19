package com.aihr.modules.subscription.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.aihr.modules.subscription.entity.SubscriptionPlan;
import org.apache.ibatis.annotations.Mapper;

/**
 * 套餐配置Mapper
 *
 * @author AIHR
 * @since 1.0.0
 */
@Mapper
public interface SubscriptionPlanMapper extends BaseMapper<SubscriptionPlan> {
}

