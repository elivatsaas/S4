"use client";
import ScheduleList from "../../components/schedules/ScheduleList";
import React from "react";

import "../../css/S4_Scheduling.css";
import { Button, ButtonGroup, Link } from "@nextui-org/react";

export default function SchedulePage() {
  return (
    <>
      <link type="text/css" href="S4_Scheduling.css" rel="stylesheet" />
      <title>Scheduling Page</title>
      <h1>Scheduling Page</h1>
      <Button color="primary">
        <Link href="/"> Home </Link>
      </Button>

      <h2> March 2024 </h2>
      <br />
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>25</td>
              <td>26</td>
              <td>27</td>
              <td>28</td>
              <td>29</td>
              <td>1</td>
              <td>2</td>
            </tr>
            <tr>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
              <td>8</td>
              <td>9</td>
            </tr>
            <tr>
              <td>10</td>
              <td>11</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
              <td>15</td>
              <td>16</td>
            </tr>
            <tr>
              <td>17</td>
              <td>18</td>
              <td>19</td>
              <td>20</td>
              <td>21</td>
              <td>22</td>
              <td>23</td>
            </tr>
            <tr>
              <td>24</td>
              <td>25</td>
              <td>26</td>
              <td>27</td>
              <td>28</td>
              <td>29</td>
              <td>30</td>
            </tr>
            <tr>
              <td>31</td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
            </tr>
          </tbody>
        </table>
        <Button color="primary">
          <Link href="/employees/1/submit"> Add Employee </Link>
        </Button>

        <a href="S4_AddShift.html">
          <button className="button-81" id="shift" role="button">
            Add Shift
          </button>
        </a>
        <a href="S4_Availability.html">
          <button className="button-81" id="availability" role="button">
            Change Availability
          </button>
        </a>
        <button className="button-81" id="gen" role="button">
          Generate
        </button>
      </div>
    </>
  );
}
