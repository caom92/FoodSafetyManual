<?php

namespace espresso;

require_once "table.php";

// Data Access Object for the hand_washing_weekly_log table
class HandWashingWeeklyLog extends Table
{
    // Default constructor
    function __construct()
    {
        parent::__construct("hand_washing_weekly_log");
    }
    
    
    // Returns the element which has the specified id in the table
    function findItemById($id)
    {
        return join([
            "[><]workplace_areas" => [
                "workplace_area_id" => "id"
                ],
            "[><]company_departments" => [
                "workplace_areas.company_department_id" => "id"
                ],
            "[><]company_zones" => [
                "company_departments.company_zone_id" => "id"
                ],
            "[><]hand_washing_daily_log" => [
                "hand_washing_daily_log_id" => "id"
                ],
            "[><]workday_periods" => [
                "hand_washing_daily_log.workday_period_id" => "id"
                ],
            "[><]hand_washing_weekly_log_comments" => [
                "weekly_comments_id" => "id"
                ]
        ], [
            "hand_washing_weekly_log.id",
            "company_zones.zone_name",
            "company_departments.department_name",
            "workplace_areas.area_name",
            "hand_washing_weekly_log.leader_employee_id",
            "workday_periods.start_time",
            "workday_periods.end_time",
            "workday_periods.period_name",
            "hand_washing_daily_log.date",
            "hand_washing_daily_log.washed_hands",
            "hand_washing_weekly_log_comments.start_date",
            "hand_washing_weekly_log_comments.end_date",
            "hand_washing_weekly_log_comments.sunday_log_comment",
            "hand_washing_weekly_log_comments.monday_log_comment",
            "hand_washing_weekly_log_comments.tuesday_log_comment",
            "hand_washing_weekly_log_comments.wednesday_log_comment",
            "hand_washing_weekly_log_comments.thursday_log_comment",
            "hand_washing_weekly_log_comments.friday_log_comment",
            "hand_washing_weekly_log_comments.saturday_log_comment"
        ], [
            "id" => $id
        ]);
    }
    
    
    // Returns the element which has the specified date in the table
    function findItemByDate($date)
    {
        return join([
            "[><]workplace_areas" => [
                "workplace_area_id" => "id"
                ],
            "[><]company_departments" => [
                "workplace_areas.company_department_id" => "id"
                ],
            "[><]company_zones" => [
                "company_departments.company_zone_id" => "id"
                ],
            "[><]hand_washing_daily_log" => [
                "hand_washing_daily_log_id" => "id"
                ],
            "[><]workday_periods" => [
                "hand_washing_daily_log.workday_period_id" => "id"
                ],
            "[><]hand_washing_weekly_log_comments" => [
                "weekly_comments_id" => "id"
                ]
        ], [
            "hand_washing_weekly_log.id",
            "company_zones.zone_name",
            "company_departments.department_name",
            "workplace_areas.area_name",
            "hand_washing_weekly_log.leader_employee_id",
            "workday_periods.start_time",
            "workday_periods.end_time",
            "workday_periods.period_name",
            "hand_washing_daily_log.date",
            "hand_washing_daily_log.washed_hands",
            "hand_washing_weekly_log_comments.start_date",
            "hand_washing_weekly_log_comments.end_date",
            "hand_washing_weekly_log_comments.sunday_log_comment",
            "hand_washing_weekly_log_comments.monday_log_comment",
            "hand_washing_weekly_log_comments.tuesday_log_comment",
            "hand_washing_weekly_log_comments.wednesday_log_comment",
            "hand_washing_weekly_log_comments.thursday_log_comment",
            "hand_washing_weekly_log_comments.friday_log_comment",
            "hand_washing_weekly_log_comments.saturday_log_comment"
        ], [
            "#hand_washing_daily_log.date" => "DATE(".$id.")"
        ]);
    }
}

?>