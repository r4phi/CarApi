using CarApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CarController : ControllerBase
{
    private readonly CarContext _context;

    public CarController(CarContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Car>>> GetCars()
    {
        if (_context.Cars == null)
        {
            return NotFound();
        }
        return await _context.Cars.ToListAsync();
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<Car>> GetCar(long id)
    {
        if (_context.Cars == null)
        {
            return NotFound();
        }
        var car = await _context.Cars.FindAsync(id);

        if (car == null)
        {
            return NotFound();
        }

        return car;
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> PutCar(long id, Car car)
    {
        if (id != car.Id)
        {
            return BadRequest();
        }

        _context.Entry(car).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!CarExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }
    
    [HttpPost]
    public async Task<ActionResult<Car>> PostTodoItem(Car car)
    {
        if (_context.Cars == null)
        {
            return Problem("Entity is null.");
        }
        _context.Cars.Add(car);
        await _context.SaveChangesAsync();

        //return CreatedAtAction("GetTodoItem", new { id = todoItem.Id }, todoItem);
        return CreatedAtAction(nameof(GetCar), new { id = car.Id }, car);
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCar(long id)
    {
        if (_context.Cars == null)
        {
            return NotFound();
        }
        var todoItem = await _context.Cars.FindAsync(id);
        if (todoItem == null)
        {
            return NotFound();
        }

        _context.Cars.Remove(todoItem);
        await _context.SaveChangesAsync();

        return NoContent();
    }
    
    private bool CarExists(long id)
    {
        return (_context.Cars?.Any(e => e.Id == id)).GetValueOrDefault();
    }
}