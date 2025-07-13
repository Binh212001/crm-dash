import {
    BooleanFieldOptional,
    ClassFieldOptional,
    NumberFieldOptional,
    StringFieldOptional,
  } from '@/decorators/field.decorators';
  import { IsArray, IsIn } from 'class-validator';
  
  class Template {
    @BooleanFieldOptional()
    enable: boolean;
  
    @StringFieldOptional()
    subject: string;
  
    @StringFieldOptional()
    content: string;
    @IsArray()
    @StringFieldOptional({ each: true })
    variable: string[];
  }
  
  class OtherConfig {
    @StringFieldOptional()
    title: string;
    @StringFieldOptional()
    address: string;
  
    @StringFieldOptional()
    password: string;
    @StringFieldOptional()
    server: string;
    @NumberFieldOptional()
    port: number;
    @BooleanFieldOptional()
    secure: boolean;
    @BooleanFieldOptional()
    ignoreTLS: boolean;
    @BooleanFieldOptional()
    requireTLS: boolean;
  }
  
  class EmailTemplate {
    @ClassFieldOptional(() => Template)
    accountCreated: Template;
    @ClassFieldOptional(() => Template)
    welcome: Template;
    @ClassFieldOptional(() => Template)
    activeAccount: Template;
    @ClassFieldOptional(() => Template)
    verifyAccount: Template;
    @ClassFieldOptional(() => Template)
    resetPassword: Template;
  
    //Thông báo đơn hàng
    @ClassFieldOptional(() => Template)
    bankTransferOrder: Template;
    @ClassFieldOptional(() => Template)
    bankTransferOrderGetCode: Template;
    @ClassFieldOptional(() => Template)
    bankTransferOrderNoneUser: Template;
    //Thông báo Thanh toán Thành công
  
    @ClassFieldOptional(() => Template)
    onlinePaymentSuccess: Template;
    @ClassFieldOptional(() => Template)
    bankTransferSuccess: Template;
    @ClassFieldOptional(() => Template)
    bankTransferSuccessGetCode: Template;
    //Affiliate
    @ClassFieldOptional(() => Template)
    registerAffiliate: Template;
  
    //Thông báo bài họchọc
    @ClassFieldOptional(() => Template)
    lessonVideo: Template;
    @ClassFieldOptional(() => Template)
    lessonAssignmentRemainingDay: Template;
  
    // //Thông báo tùy chỉnh
    @ClassFieldOptional(() => Template)
    notificationCustomGeneral: Template;
  
    @ClassFieldOptional(() => Template)
    notificationCustomOnlineClassTimeAnnouncement: Template;
  
    @ClassFieldOptional(() => Template)
    notificationCustomPromotionAndDiscountAnnouncement: Template;
  
    @ClassFieldOptional(() => Template)
    notificationCustomPostStatusUpdateNotification: Template;
  
    @ClassFieldOptional(() => Template)
    courseExpire: Template;
  }
  
  export class EmailConfigDto {
    @IsIn(['other'])
    server: string;
    @ClassFieldOptional(() => OtherConfig)
    other: OtherConfig;
    @ClassFieldOptional(() => EmailTemplate)
    emailTemplate: EmailTemplate;
  }
  