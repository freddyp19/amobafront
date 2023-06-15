<!-- eslint-disable vue/no-unused-vars -->
<!-- eslint-disable vue/require-v-for-key -->

<template>
  <div
    class="grid grid-cols-10 gap-4 space-x-16 p-10 bg-slate-100 max-h-screen"
  >
    <Menu />
    <main class="col-span-5">
      <div>
        <span class="text-3xl font-bold text-gray-800 flex pt-5">
          Schedules
        </span>
      </div>

      <div class="grid grid-cols-1 w-4/6">
        <div class="mb-5">
          <label class="label">
            <span class="label-text">Seleccione Fecha</span>
          </label>
          <div>
            <VueDatePicker
              v-model="dateCalendar"
              range
              class="w-full max-w-screen-xl mx-auto"
            />
          </div>
        </div>

      </div>

      <div>
        <div class="bg-white shadow overflow-hidden rounded-3xl">
          <div class="flex items-center justify-between py-10 px-8">
            <div>
              <span class="text-4xl font-bold text-gray-800">
                {{ monthNames[month] }}
              </span>
              <span class="ml-1 text-4xl text-gray-800 font-bold">
                {{ year }}
              </span>
            </div>
            <div class="border rounded-lg px-1" style="padding-top: 2px">
              <button
                type="button"
                class="leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center"
                @click="preCalendar()"
              >
                <svg
                  class="h-6 w-6 text-gray-500 inline-flex leading-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div class="border-r inline-flex h-6"></div>
              <button
                type="button"
                class="leading-none rounded-lg transition ease-in-out duration-100 inline-flex items-center cursor-pointer hover:bg-gray-200 p-1"
                @click="nextCalendar()"
              >
                <svg
                  class="h-6 w-6 text-gray-500 inline-flex leading-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="-mx-1 -mb-1">
            
            <div class="grid grid-cols-7">
              <div v-for="(day, idx) in dayNames" :key="idx" class="col-span-1">
                <div class="px-2 py-2">
                  <div
                    class="text-gray-600 text-sm tracking-wide font-bold text-center"
                  >
                    {{ day }}
                  </div>
                </div>
              </div>
            </div>
            

            <div class="grid grid-cols-7 border-t border-l content-center">
              <div
                v-for="(blankday, idx) in blankDays"
                :key="idx"
                class="col-span-1"
              >
                <div class="text-center border-r border-b px-4 pt-2 h-20"></div>
              </div>

              <div v-for="(day, idx) in noOfDays" :key="idx" class="col-span-1">
                <div class="px-4 pt-4 border-r border-b relative h-20 rounded-3xl"
                :class="{
                      'bg-gray-50 text-neutral-950': isDaysServices(day) == true,
                      'bg-gray-600 text-white': isRouteFull(day) == true,
                      'bg-red-600 text-white': isNotFrecuencie(day) == true,
                      'bg-yellow-300 text-white': isCalendarDaysDisableds(day) == true,
                      'bg-green-700 text-white': isReserved(day) == true,
                      //'bg-blue-400 text-white': isToday(day) == true,
                    }">
                  <div
                    class="inline-flex mt-1 w-12 h-12 items-center justify-center text-center rounded-full text-xl p-3"
                  >
                    {{ day }}
                  </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <div class="col-span-3">
      <div class="grid">
        <div class="pl-10">
          <div class="navbar space-x-2">
            <div class="flex-none gap-2">
              <div class="form-control">
                <div class="input-group">
                  <input
                    type="text"
                    placeholder="Search…"
                    class="input input-sm w-40"
                  />
                  <button
                    class="btn btn-sm bg-white hover:bg-white border-none"
                  >
                    <img src="lupa.png" width="15" />
                  </button>
                </div>
              </div>
            </div>
            <div className="navbar-end space-x-8">
              <div className="indicator">
                <img src="notificacion.png" width="30" />
              </div>
              <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                  <img src="hombre.png" width="20" />
                </div>
              </label>
            </div>
          </div>
        </div>
        
        <div class="py-24">
          <div class="bg-white overflow-y-auto max-h-96 rounded-3xl">
            <div class="px-10 py-6">
              <span class="text-3xl font-bold text-gray-800 flex pt-5">
                Rutas disponibles
              </span>
            </div>
            <div class="flex px-8">
              <div>
                <ul class="menu lext-left">
                  <li
                    v-for="(route, idx) in routes"
                    :key="idx"
                    class="text-left border-l-green-600 border-l-4 hover:bg-transparent hover:border-l-green-100"
                    :class="{'bg-transparent bg-stone-100 border-l-green-100' : route.id==routeIDSelected}"
                    @click="selectRoute(route.id)"
                  >
                    <div>
                      {{ route.id }} - {{ route.title }}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import dayjs from "dayjs";
import axios from "axios";
import Menu from "@/components/Menu.vue";
const configCalendarDate = ref();

axios.defaults.headers["Authorization"] =
  "Bearer " + localStorage.getItem("token");

export default defineComponent({
  data() {
    return {
      ApiUrl: "http://localhost:8080/api/v1",

      day: "",
      month: "",
      year: "",

      noOfDays: [],
      blankDays: [],
      routes: [],
      routeIDSelected:0,

      dateCalendar: configCalendarDate,
      monthNames: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      dayNames: [
        "Sunday",
        "Monday",
        "Tusday",
        "Wendsney",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      days: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
      daysNotFrecuencie: [],
      calendarDaysDisableds: [],
      datesReservations: [],
      dasyServicesANDAllReservations:[]
    };
  },

  components: {
    Menu,
  },

  mounted() {
    this.existToken()
    this.ini();
  },

  methods: {
    existToken() {
      if(!localStorage.token){
        this.$router.push("/login");
      }
    },
    async ini() {
      //definimos los datos de la fecha
      this.day = new Date(dayjs().format("YYYY-MM-DD"));
      this.month = this.day.getMonth();
      this.year = this.day.getFullYear();
      this.configCalendar();
      this.calculateNoOfDays();
      this.mounteRoutes();
    },
    configCalendar(){
      let lastDayInMonth = new Date(this.year, (this.month + 1), 0).getDate();
      let firstDaysInMonth = 1;

      const startDate = new Date(this.year, this.month, firstDaysInMonth);
      const endDate = new Date(this.year, this.month, lastDayInMonth);
      configCalendarDate.value = [startDate, endDate];
    },
    async nextCalendar() {
      if (this.month == 11) {
        this.month=0;
        this.year++;
      }else{
        this.month++;
      }
      this.configCalendar();
      this.calculateNoOfDays();
      if(this.routeIDSelected>0){
        await this.selectRoute(this.routeIDSelected);
      }
      
    },
    async preCalendar() {
      if (this.month == 0) {
        this.month=11;
        this.year--;
      }else{
        this.month--;
      }
      this.configCalendar();
      this.calculateNoOfDays();
      if(this.routeIDSelected>0){
        await this.selectRoute(this.routeIDSelected);
      }
    },
    isToday(day) {
      const date = new Date();
      const d = new Date(this.year, this.month, day);

      return date.toDateString() === d.toDateString() ? true : false;
    },
    isNotFrecuencie(day) {
      let d = new Date(this.year, this.month, day);
      let dayNum = dayjs(d, "YYYY-MM-DD").day();

      let activo = true;
      if (!(this.daysNotFrecuencie.indexOf(this.days[dayNum]) != -1)) {
        activo = false;
      }
      return activo;
    },
    isCalendarDaysDisableds(day) {
      let d = new Date(this.year, this.month, day);
      //console.log("day: isCalendarDaysDisableds ",d);
      let date = dayjs(d, "YYYY-MM-DD").format("YYYY-MM-DD").toString();
      //console.log("date: isCalendarDaysDisableds ",date);
      let activo = true;
      if (!(this.calendarDaysDisableds.indexOf(date) != -1)) {
        activo = false;
      }
      return activo;
    },
    isReserved(day) {
      let d = new Date(this.year, this.month, day);
      //console.log("day: isReserved ",d)
      let date = dayjs(d, "YYYY-MM-DD").format("YYYY-MM-DD").toString();
      //console.log("day: isReserved ",date);
      let activo = true;
      if (!(this.datesReservations.indexOf(date) != -1)) {
        activo = false;
      }
      return activo;
    },
    isDaysServices(day){
      let d = new Date(this.year, this.month, day);
      //console.log("day: isDaysServices ",d);
      let date = dayjs(d, "YYYY-MM-DD").format("YYYY-MM-DD").toString();
      //console.log("date: isDaysServices ",date);
      let activo = false;
      if(!this.isReserved(day) && (!this.isRouteFull(day))){
        for (let index = 0; index < this.dasyServicesANDAllReservations.length; index++) {
          let dayService = dayjs(this.dasyServicesANDAllReservations[index].day, "YYYY-MM-DD").format("YYYY-MM-DD").toString();
          if(dayService==date){
            activo = true;
            break;
          }
        }
      }
      return activo;
    },
    isRouteFull(day){
      let d = new Date(this.year, this.month, day);
      //console.log("day: isRouteFull ",d);
      let date = dayjs(d, "YYYY-MM-DD").format("YYYY-MM-DD").toString();
      //console.log("date: isRouteFull ",date);
      let activo = false;
      let dsR = this.dasyServicesANDAllReservations;
      if(!this.isReserved(day)){
        for (let index = 0; index < dsR.length; index++) {
          let dayService = dayjs(dsR[index].day, "YYYY-MM-DD").format("YYYY-MM-DD").toString();
          if((dayService==date) && (parseInt(dsR[index].allReservations) >= parseInt(dsR[index].allCapacity))){
            console.log(dsR[index]);
            activo = true;
            break;
          }
        }
      }
      return activo;

    },
    calculateNoOfDays() {
      let daysInMonth = new Date(this.year, (this.month + 1), 0).getDate();
      let dayOfWeek = new Date(this.year, this.month).getDay();

      let blankDaysArray = [];

      for (var i = 1; i <= dayOfWeek; i++) {
        blankDaysArray.push(i);
      }

      let daysArray = [];
      // eslint-disable-next-line no-redeclare
      for (var i = 1; i <= daysInMonth; i++) {
        daysArray.push(i);
      }

      this.blankDays = blankDaysArray;
      this.noOfDays = daysArray;
    },
    async mounteRoutes() {
      try {
        let ruta = `${this.ApiUrl}/routes`;
        axios
          .post(ruta)
          .then(({ data }) => {
            this.routes = data.routes;
          })
          .catch(function (error) {
            console.log(error.toJSON());
          });
      } catch (error) {
        console.error(error);
      }
    },
    async selectRoute(routeID) {
      try {
        this.routeIDSelected=routeID;
        axios
          .post(`${this.ApiUrl}/route-data/`, { "id": routeID, "rangeDates": this.dateCalendar })
          .then(({ data }) => {
            console.log(data.routeData.calendarDaysDisableds);

            let routeData = data.routeData;

            this.calendarInit = routeData.date_init;
            this.calendarFinish = routeData.date_finish;
            this.daysNotFrecuencie = [];
            if (!routeData.mon) {
              this.daysNotFrecuencie.push("mon");
            }
            if (!routeData.tue) {
              this.daysNotFrecuencie.push("tue");
            }
            if (!routeData.wed) {
              this.daysNotFrecuencie.push("wed");
            }
            if (!routeData.thu) {
              this.daysNotFrecuencie.push("thu");
            }
            if (!routeData.fri) {
              this.daysNotFrecuencie.push("fri");
            }
            if (!routeData.sat) {
              this.daysNotFrecuencie.push("sat");
            }
            if (!routeData.sun) {
              this.daysNotFrecuencie.push("sun");
            }

            this.calendarDaysDisableds = routeData.calendarDaysDisableds;
            this.datesReservations = routeData.datesReservations;
            this.dasyServicesANDAllReservations = routeData.dasyServicesANDAllReservations;
            console.log(this.dasyServicesANDAllReservations);
            //console.log(this.days);
            //console.log(this.daysNotFrecuencie);
            this.calculateNoOfDays();
          })
          .catch(function (error) {
            console.log(error.toJSON());
          });
      } catch (error) {
        console.error(error);
      }
    },
  },
});
</script>
