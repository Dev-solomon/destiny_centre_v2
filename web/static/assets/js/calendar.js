// Calendar functionality
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();

        // Sample events data with blue tick dates
        const events = {
            '2024-04-11': [
                { title: 'Bible Study', time: '08:00am - 09:00am' },
                { title: 'Sunday Worship', time: '07:00pm - 08:00pm' },
                { title: 'Community Outreach', time: '08:00pm - 10:00pm' },
            ],
            '2024-04-14': [
                { title: 'Sunday Worship', time: '10:00am - 12:00pm' }
            ],
            '2024-04-20': [
                { title: 'Community Outreach', time: '02:00pm - 05:00pm' }
            ],
            '2024-04-25': [
                { title: 'Youth Meeting', time: '06:00pm - 08:00pm' }
            ],
            '2024-04-28': [
                { title: 'Bible Study', time: '08:00am - 09:00am' }
            ]
        };

        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        function generateCalendar(month, year) {
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const daysInMonth = lastDay.getDate();
            const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Adjust for Monday start

            const calendarGrid = document.getElementById('calendarGrid');
            const calendarTitle = document.getElementById('calendarTitle');
            
            calendarTitle.textContent = `${months[month]} ${year}`;
            calendarGrid.innerHTML = '';

            // Add day headers
            daysOfWeek.forEach(day => {
                const dayHeader = document.createElement('div');
                dayHeader.className = 'calendar-day-header';
                dayHeader.textContent = day;
                calendarGrid.appendChild(dayHeader);
            });

            // Add empty cells for days before the first day of the month
            for (let i = 0; i < startingDayOfWeek; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'calendar-day other-month';
                const prevMonthLastDay = new Date(year, month, 0).getDate();
                emptyDay.textContent = prevMonthLastDay - startingDayOfWeek + i + 1;
                calendarGrid.appendChild(emptyDay);
            }

            // Add days of the current month
            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.textContent = day;
                
                const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                
                // Check if this date has events (add blue tick)
                if (events[dateString]) {
                    dayElement.classList.add('has-event');
                }
                
                // Check if this is today
                const today = new Date();
                if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
                    dayElement.classList.add('today');
                }
                
                dayElement.addEventListener('click', () => selectDate(year, month, day));
                calendarGrid.appendChild(dayElement);
            }

            // Add days from next month to fill the grid
            const totalCells = calendarGrid.children.length;
            const remainingCells = 42 - totalCells; // 6 rows × 7 days = 42 cells
            for (let day = 1; day <= remainingCells; day++) {
                const nextMonthDay = document.createElement('div');
                nextMonthDay.className = 'calendar-day other-month';
                nextMonthDay.textContent = day;
                calendarGrid.appendChild(nextMonthDay);
            }
        }

        function selectDate(year, month, day) {
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const selectedDateElement = document.getElementById('selectedDate');
            const dayEventsElement = document.getElementById('dayEvents');
            
            selectedDateElement.textContent = `${months[month]} ${day} ${year}`;
            
            if (events[dateString]) {
                dayEventsElement.innerHTML = events[dateString].map(event => `
                    <div class="event-item">
                    <div class="event-item-time">${event.time}</div>
                        <div class="event-item-title">${event.title}</div>
                    </div>
                `).join('');
            } else {
                dayEventsElement.innerHTML = '<div class="text-light">No events scheduled for this day.</div>';
            }
        }

        function previousMonth() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            generateCalendar(currentMonth, currentYear);
        }

        function nextMonth() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            generateCalendar(currentMonth, currentYear);
        }

        // Google Calendar integration
        function addToGoogleCalendar(title, startTime, endTime, description) {
            const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
            const params = new URLSearchParams({
                text: title,
                dates: `${startTime.replace(/[-:]/g, '').replace('T', 'T')}Z/${endTime.replace(/[-:]/g, '').replace('T', 'T')}Z`,
                details: description,
                location: 'Church Address, City, State'
            });
            
            window.open(`${baseUrl}&${params.toString()}`, '_blank');
        }

        // Initialize calendar
        document.addEventListener('DOMContentLoaded', function() {
            generateCalendar(currentMonth, currentYear);
            // Select April 11 by default
            selectDate(2024, 3, 11);
        });