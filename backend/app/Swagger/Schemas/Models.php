<?php

/**
* @OA\Schema(
*   schema="SingleClan",
*   @OA\Property(
*       property="data",
*       ref="#/components/schemas/Clan"
*   )
* )
*/

/**
* @OA\Schema(
*   schema="ClanCollection",
*   @OA\Property(
*       property="data",
*       type="array",
*       @OA\Items(ref="#/components/schemas/Clan")
*   )
* )
*/


/**
* @OA\Schema(
*   schema="SingleGrade",
*   @OA\Property(
*       property="data",
*       ref="#/components/schemas/Grade"
*   )
* )
*/

/**
* @OA\Schema(
*   schema="GradeCollection",
*   @OA\Property(
*       property="data",
*       type="array",
*       @OA\Items(ref="#/components/schemas/Grade")
*   )
* )
*/


/**
* @OA\Schema(
*   schema="SingleModule",
*   @OA\Property(
*       property="data",
*       ref="#/components/schemas/Module"
*   )
* )
*/

/**
* @OA\Schema(
*   schema="ModuleCollection",
*   @OA\Property(
*       property="data",
*       type="array",
*       @OA\Items(ref="#/components/schemas/Module")
*   )
* )
*/


/**
* @OA\Schema(
*   schema="SinglePeriod",
*   @OA\Property(
*       property="data",
*       ref="#/components/schemas/Period"
*   )
* )
*/

/**
* @OA\Schema(
*   schema="PeriodCollection",
*   @OA\Property(
*       property="data",
*       type="array",
*       @OA\Items(ref="#/components/schemas/Period")
*   )
* )
*/


/**
* @OA\Schema(
*   schema="SinglePrice",
*   @OA\Property(
*       property="data",
*       ref="#/components/schemas/Price"
*   )
* )
*/

/**
* @OA\Schema(
*   schema="PriceCollection",
*   @OA\Property(
*       property="data",
*       type="array",
*       @OA\Items(ref="#/components/schemas/Price")
*   )
* )
*/


/**
* @OA\Schema(
*   schema="SingleRole",
*   @OA\Property(
*       property="data",
*       ref="#/components/schemas/Role"
*   )
* )
*/

/**
* @OA\Schema(
*   schema="RoleCollection",
*   @OA\Property(
*       property="data",
*       type="array",
*       @OA\Items(ref="#/components/schemas/Role")
*   )
* )
*/


/**
* @OA\Schema(
*   schema="SingleSchedule",
*   @OA\Property(
*       property="data",
*       ref="#/components/schemas/Schedule"
*   )
* )
*/

/**
* @OA\Schema(
*   schema="ScheduleCollection",
*   @OA\Property(
*       property="data",
*       type="array",
*       @OA\Items(ref="#/components/schemas/Schedule")
*   )
* )
*/


/**
* @OA\Schema(
*   schema="SingleUser",
*   @OA\Property(
*       property="data",
*       ref="#/components/schemas/User"
*   )
* )
*/

/**
* @OA\Schema(
*   schema="UserCollection",
*   @OA\Property(
*       property="data",
*       type="array",
*       @OA\Items(ref="#/components/schemas/User")
*   )
* )
*/


/**
* @OA\Schema(
*     schema="Instructor",
*     title="Instructor",
*     required={
*          "id", "name", "email", "phone_number"
*     },
*     @OA\Property(
*         property="id",
*         description="Unique identificator",
*         title="id",
*         type="integer",
*         format="int64",
*     ),
*     @OA\Property(
*         property="name",
*         description="User name",
*         title="name",
*         type="string",
*     ),
*     @OA\Property(
*         property="email",
*         description="User email",
*         title="email",
*         type="string",
*     ),
*     @OA\Property(
*         property="phone_number",
*         description="User phone number",
*         title="phone_number",
*         type="string",
*     )
* )
*/

/**
* @OA\Schema(
*   schema="InstructorCollection",
*   @OA\Property(
*       property="data",
*       type="array",
*       @OA\Items(ref="#/components/schemas/Instructor")
*   )
* )
*/
